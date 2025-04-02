import { ClaimStatus, prisma } from "@repo/database";
import { getRoutingFee } from "@repo/shared";
import { Mutex, type MutexInterface, withTimeout } from "async-mutex";
import { on } from "node:events";
import z from "zod";
import { PAYMENT_SUCCESS_EVENT } from "../constants";
import { ee } from "../eventEmitter";
import { lnGrpcClient, promisifyGrpc, routerGrpcClient } from "../lndClient";
import type { Payment__Output } from "../protos/generated/lnrpc/Payment";
import { publicProcedure, router } from "../trpc";

const mutexes = new Map<string, MutexInterface>();

const paymentsRouter = router({
	withdraw: publicProcedure.query(async ({ ctx }) => {
		const { k1, pr } = z.object({ k1: z.string(), pr: z.string() }).parse(ctx.req.query);

		if (!mutexes.has(k1)) {
			mutexes.set(k1, withTimeout(new Mutex(), 15 * 1000)); // todo
		}

		// biome-ignore lint/style/noNonNullAssertion: It is set on the line above
		const mutex = mutexes.get(k1)!;

		const release = await mutex.acquire();

		const claim = await prisma.claims.findUnique({ where: { id: k1 } });

		if (!claim || claim.status !== ClaimStatus.PAID) {
			release();

			return {
				status: "ERROR",
				reason: "Claim not found, already claimed or not paid for yet.",
			};
		}

		const result = await promisifyGrpc(lnGrpcClient.DecodePayReq.bind(lnGrpcClient), {
			payReq: pr,
		});

		if (!result) {
			release();

			return {
				status: "ERROR",
				reason: "Invalid pr.",
			};
		}

		if (Number(result.numSatoshis) !== claim.receiverSatsAmount) {
			release();

			return {
				status: "ERROR",
				reason: `Claim for ${result.numSatoshis} sats doesn't match the expected claim of ${claim.receiverSatsAmount} sats.`,
			};
		}

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

		return { status: "OK" };
	}),
	getWithdrawInfo: publicProcedure.input(z.string()).query(async ({ input: claimId }) => {
		const claim = await prisma.claims.findUnique({ where: { id: claimId } });

		if (!claim || claim.status !== ClaimStatus.PAID) {
			return {
				status: "ERROR",
				reason: "Claim not found, already claimed or not paid for yet.",
			};
		}

		const receiverMilliSats = claim.receiverSatsAmount * 1000;

		return {
			tag: "withdrawRequest",
			callback: "https://stackorange.com/api/payments.withdraw",
			k1: claim.id,
			defaultDescription: "Orange pill from stackorange.com",
			minWithdrawable: receiverMilliSats,
			maxWithdrawable: receiverMilliSats,
		};
	}),
	paymentUpdate: publicProcedure.input(z.string()).subscription(async function* ({
		input: paymentId,
		signal,
	}) {
		for await (const [data] of on(ee, PAYMENT_SUCCESS_EVENT, {
			signal,
		})) {
			if (data === paymentId) {
				yield data;
			}
		}
	}),
});

export { paymentsRouter };
