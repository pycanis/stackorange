import { ClaimChannel, prisma } from "@repo/database";
import { getRoutingFee } from "@repo/shared";
import { z } from "zod";
import { lnGrpcClient, promisifyGrpc } from "../lndClient";
import { publicProcedure, router } from "../trpc";

const claimsRouter = router({
	getClaimsByIds: publicProcedure.input(z.array(z.string())).query(async ({ input: claimIds }) => {
		if (claimIds.length === 0) {
			return [];
		}

		if (claimIds.length === 1) {
			const claim = await prisma.claims.findUnique({
				where: { id: claimIds[0] },
			});

			if (!claim) {
				return [];
			}

			return [claim];
		}

		const claims = await prisma.claims.findMany({
			where: { id: { in: claimIds } },
			orderBy: { createdAt: "desc" },
		});

		return claims;
	}),
	createClaim: publicProcedure
		.input(
			z.object({
				channel: z.nativeEnum(ClaimChannel),
				sender: z.string(),
				receiver: z.string(),
				message: z.string(),
				receiverSatsAmount: z.number(),
				platformSatsAmount: z.number().nullable(),
			}),
		)
		.mutation(async ({ input }) => {
			const { channel, platformSatsAmount, message, sender, receiver, receiverSatsAmount } = input;

			const result = await promisifyGrpc(lnGrpcClient.AddInvoice.bind(lnGrpcClient), {
				memo: "Stack orange invoice",
				value: receiverSatsAmount + (platformSatsAmount ?? 0) + getRoutingFee(receiverSatsAmount),
			});

			if (!result) {
				throw new Error("Error generating invoice.");
			}

			const claim = await prisma.claims.create({
				data: {
					paymentRequest: result.paymentRequest,
					channel,
					platformSatsAmount,
					sender,
					receiver,
					receiverSatsAmount,
					message,
				},
			});

			return claim;
		}),
});

export { claimsRouter };
