import { BalanceStatus } from "@prisma/client";
import { notifyPaymentSubscribers } from "./notifyPaymentSubscribers";
import { prisma } from "./prisma";

type HandleIncomingPaymentParams = {
  state: string;
  paymentRequest: string;
};

export const handleIncomingPayment = async ({ paymentRequest, state }: HandleIncomingPaymentParams) => {
  if (state === "OPEN") {
    return;
  }

  const balance = await prisma.balances.findUnique({
    where: { paymentRequest, status: BalanceStatus.AWAITING_PAYMENT },
  });

  if (!balance) return;

  if (state === "SETTLED") {
    await prisma.balances.update({
      where: { paymentRequest },
      data: { status: BalanceStatus.PAID },
    });

    notifyPaymentSubscribers(balance.id);
  }
};
