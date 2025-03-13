import { BalanceStatus } from "@prisma/client";
import { Invoice__Output } from "../protos/generated/lnrpc/Invoice";
import { sendEmail } from "./email";
import { notifyPaymentSubscribers } from "./notifyPaymentSubscribers";
import { prisma } from "./prisma";

export const handleIncomingPayment = async ({ paymentRequest, state }: Invoice__Output) => {
  if (state === "SETTLED") {
    const balance = await prisma.balances.findUnique({
      where: { paymentRequest, status: BalanceStatus.AWAITING_PAYMENT },
    });

    if (!balance) return;

    await prisma.balances.update({
      where: { paymentRequest },
      data: { status: BalanceStatus.PAID },
    });

    notifyPaymentSubscribers(paymentRequest);

    // todo: handle multiple platforms
    await sendEmail({ recipientEmail: balance.receiver });
  }
};
