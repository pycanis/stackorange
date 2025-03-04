import { paymentSubscribers } from "./paymentSubscribers";

export const notifyPaymentSubscribers = (paymentRequest: string) => {
  const subscribers = paymentSubscribers.get(paymentRequest);

  subscribers?.forEach((res) => {
    res.write(
      `data: ${JSON.stringify({
        paymentRequest,
      })}\n\n`
    );
  });
};
