import { type Response } from "express";

export const paymentSubscribers = new Map<string, Response[]>();

export const notifyPaymentSubscribers = (balanceId: string) => {
  const subscribers = paymentSubscribers.get(balanceId);

  subscribers?.forEach((res) => {
    res.write(
      `data: ${JSON.stringify({
        balanceId,
      })}\n\n`
    );
  });
};
