import { ClaimStatus, prisma } from "@repo/database";
import { sendEmail } from "./email";
import { notifyPaymentSubscribers } from "./notifyPaymentSubscribers";
import type { Invoice__Output } from "./protos/generated/lnrpc/Invoice";

export const handleIncomingPayment = async ({ paymentRequest, state }: Invoice__Output) => {
	if (state === "SETTLED") {
		const claim = await prisma.claims.findUnique({
			where: { paymentRequest, status: ClaimStatus.AWAITING_PAYMENT },
		});

		if (!claim) return;

		await prisma.claims.update({
			where: { paymentRequest },
			data: { status: ClaimStatus.PAID },
		});

		notifyPaymentSubscribers(paymentRequest);

		// todo: handle multiple platforms
		await sendEmail(claim);
	}
};
