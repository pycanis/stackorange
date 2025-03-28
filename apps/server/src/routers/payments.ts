import { ClaimStatus, prisma } from "@repo/database";
import { getRoutingFee } from "@repo/shared";
import { Mutex, type MutexInterface, withTimeout } from "async-mutex";
import { Router } from "express";
import { lnGrpcClient, promisifyGrpc, routerGrpcClient } from "../lndClient";
import { notifyPaymentSubscribers } from "../notifyPaymentSubscribers";
import { paymentSubscribers } from "../paymentSubscribers";
import type { Payment__Output } from "../protos/generated/lnrpc/Payment";
import { getRequiredStringParams } from "../utils/params";
import { routeHandler } from "../utils/routeHandler";

const mutexes = new Map<string, MutexInterface>();

const router = Router();

router.get(
	"/withdraw",
	routeHandler(async (req, res) => {
		const { k1, pr } = getRequiredStringParams(req, ["k1", "pr"]);

		if (!mutexes.has(k1)) {
			mutexes.set(k1, withTimeout(new Mutex(), 15 * 1000)); // todo
		}

		// biome-ignore lint/style/noNonNullAssertion: It is set on the line above
		const mutex = mutexes.get(k1)!;

		const release = await mutex.acquire();

		const claim = await prisma.claims.findUnique({ where: { id: k1 } });

		if (!claim || claim.status !== ClaimStatus.PAID) {
			res.json({
				status: "ERROR",
				reason: "Claim not found, already claimed or not paid for yet.",
			});

			release();

			return;
		}

		const result = await promisifyGrpc(lnGrpcClient.DecodePayReq.bind(lnGrpcClient), {
			payReq: pr,
		});

		if (!result) {
			res.json({
				status: "ERROR",
				reason: "Invalid pr.",
			});

			release();

			return;
		}

		if (Number(result.numSatoshis) !== claim.receiverSatsAmount) {
			res.json({
				status: "ERROR",
				reason: `Claim for ${result.numSatoshis} sats doesn't match the expected claim of ${claim.receiverSatsAmount} sats.`,
			});

			release();

			return;
		}

		res.json({ status: "OK" });

		const stream = routerGrpcClient.SendPaymentV2({
			paymentRequest: pr,
			feeLimitSat: getRoutingFee(claim.receiverSatsAmount),
			timeoutSeconds: 15, // todo
		});

		stream.on("data", async (data: Payment__Output) => {
			if (data.status === "FAILED") {
				release();
			}

			if (data.status === "SUCCEEDED") {
				await prisma.claims.update({
					where: { id: k1 },
					data: { status: ClaimStatus.CLAIMED },
				});

				notifyPaymentSubscribers(k1);

				release();
			}
		});

		stream.on("error", (err) => {
			console.log("Error happened during payment stream: ", err);

			release();
		});
	}),
);

router.get(
	"/withdraw/:claimId",
	routeHandler(async (req, res) => {
		const { claimId } = getRequiredStringParams(req, ["claimId"]);

		const claim = await prisma.claims.findUnique({ where: { id: claimId } });

		if (!claim || claim.status !== ClaimStatus.PAID) {
			res.json({
				status: "ERROR",
				reason: "Claim not found, already claimed or not paid for yet.",
			});

			return;
		}

		const receiverMilliSats = claim.receiverSatsAmount * 1000;

		res.json({
			tag: "withdrawRequest",
			callback: "https://stackorange.com/api/payments/withdraw",
			k1: claim.id,
			defaultDescription: "Orange pill from stackorange.com",
			minWithdrawable: receiverMilliSats,
			maxWithdrawable: receiverMilliSats,
		});
	}),
);

router.get(
	"/:paymentId",
	routeHandler(async (req, res) => {
		const { paymentId } = getRequiredStringParams(req, ["paymentId"]);

		res.setHeader("Content-Type", "text/event-stream");
		res.setHeader("Cache-Control", "no-cache");
		res.setHeader("Connection", "keep-alive");
		res.flushHeaders();

		const ts = Date.now();

		res.id = ts;

		paymentSubscribers.set(paymentId, [...(paymentSubscribers.get(paymentId) ?? []), res]);

		req.on("close", () => {
			paymentSubscribers.set(
				paymentId,
				(paymentSubscribers.get(paymentId) ?? []).filter((rs) => rs.id !== res.id),
			);
		});
	}),
);

export { router };
