import { paymentSubscribers } from "./paymentSubscribers";

export const notifyPaymentSubscribers = (paymentId: string) => {
	const subscribers = paymentSubscribers.get(paymentId);

	for (const res of subscribers ?? []) {
		res.write(
			`data: ${JSON.stringify({
				paymentId,
			})}\n\n`,
		);
	}
};
