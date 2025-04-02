import { ClaimStatus, prisma } from "@repo/database";
import { getRoutingFee } from "@repo/shared";
import { Mutex, type MutexInterface, withTimeout } from "async-mutex";
import { Router } from "express";
import z from "zod";
import { PAYMENT_SUCCESS_EVENT } from "./constants";
import { ee } from "./eventEmitter";
import { lnGrpcClient, promisifyGrpc, routerGrpcClient } from "./lndClient";
import type { Payment__Output } from "./protos/generated/lnrpc/Payment";

const router = Router();

const mutexes = new Map<string, MutexInterface>();

router.get("/", async (req, res) => {
	const { k1, pr } = z.object({ k1: z.string(), pr: z.string() }).parse(req.query);

	if (!mutexes.has(k1)) {
		mutexes.set(k1, withTimeout(new Mutex(), 15 * 1000)); // todo
	}

	// biome-ignore lint/style/noNonNullAssertion: It is set on the line above
	const mutex = mutexes.get(k1)!;

	const release = await mutex.acquire();

	const claim = await prisma.claims.findUnique({ where: { id: k1 } });

	if (!claim || claim.status !== ClaimStatus.PAID) {
		release();

		res.json({
			status: "ERROR",
			reason: "Claim not found, already claimed or not paid for yet.",
		});

		return;
	}

	const result = await promisifyGrpc(lnGrpcClient.DecodePayReq.bind(lnGrpcClient), {
		payReq: pr,
	});

	if (!result) {
		release();

		res.json({
			status: "ERROR",
			reason: "Invalid pr.",
		});

		return;
	}

	if (Number(result.numSatoshis) !== claim.receiverSatsAmount) {
		release();

		res.json({
			status: "ERROR",
			reason: `Claim for ${result.numSatoshis} sats doesn't match the expected claim of ${claim.receiverSatsAmount} sats.`,
		});

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

			ee.emit(PAYMENT_SUCCESS_EVENT, claim.paymentRequest);

			release();
		}
	});

	stream.on("error", (err) => {
		console.log("Error happened during payment stream: ", err);

		release();
	});
});

router.get("/:claimId", async (req, res) => {
	const claim = await prisma.claims.findUnique({ where: { id: req.params.claimId } });

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
		callback: "https://stackorange.com/api/withdraw",
		k1: claim.id,
		defaultDescription: "Orange pill from stackorange.com",
		minWithdrawable: receiverMilliSats,
		maxWithdrawable: receiverMilliSats,
	});
});

export { router };
