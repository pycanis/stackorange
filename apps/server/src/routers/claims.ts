import { prisma } from "@repo/database";
import { createClaimSchema, getRoutingFee } from "@repo/shared";
import { Router } from "express";
import { lnGrpcClient, promisifyGrpc } from "../lndClient";
import { getRequiredStringArrayParams } from "../utils/params";
import { routeHandler } from "../utils/routeHandler";

const router = Router();

router.get(
	"/",
	routeHandler(async (req, res) => {
		const { claimIds } = getRequiredStringArrayParams(req, ["claimIds"]);

		if (claimIds.length === 0) {
			res.json([]);

			return;
		}

		if (claimIds.length === 1) {
			const claim = await prisma.claims.findUnique({
				where: { id: claimIds[0] },
			});

			if (!claim) {
				res.json([]);

				return;
			}

			res.json([claim]);

			return;
		}

		const claims = await prisma.claims.findMany({
			where: { id: { in: claimIds } },
			orderBy: { createdAt: "desc" },
		});

		res.json(claims);

		return;
	}),
);

router.post(
	"/",
	routeHandler(async (req, res) => {
		const {
			channel,
			platformSatsAmount,
			message,
			receiver,
			receiverSatsAmount,
		} = createClaimSchema.parse(req.body);

		const result = await promisifyGrpc(
			lnGrpcClient.AddInvoice.bind(lnGrpcClient),
			{
				memo: "Stack orange invoice",
				value:
					receiverSatsAmount +
					(platformSatsAmount ?? 0) +
					getRoutingFee(receiverSatsAmount),
			},
		);

		if (!result) {
			throw new Error("Error generating invoice.");
		}

		const claim = await prisma.claims.create({
			data: {
				paymentRequest: result.paymentRequest,
				channel,
				platformSatsAmount,
				receiver,
				receiverSatsAmount,
				message,
			},
		});

		res.json(claim);
	}),
);

export { router };
