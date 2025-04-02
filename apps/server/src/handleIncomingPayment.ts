import { ClaimStatus, prisma } from "@repo/database";
import { PAYMENT_SUCCESS_EVENT } from "./constants";
import { sendEmail } from "./email";
import { ee } from "./eventEmitter";

export const handleIncomingPayment = async (paymentRequest: string) => {
	const claim = await prisma.claims.findUnique({
		where: { paymentRequest, status: ClaimStatus.AWAITING_PAYMENT },
	});

	if (!claim) return;

	await prisma.claims.update({
		where: { paymentRequest },
		data: { status: ClaimStatus.PAID },
	});

	ee.emit(PAYMENT_SUCCESS_EVENT, paymentRequest);

	// todo: handle multiple platforms
	await sendEmail(claim);
};
