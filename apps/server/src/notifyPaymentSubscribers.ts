import { paymentSubscribers } from "./paymentSubscribers";

export const notifyPaymentSubscribers = (paymentRequest: string) => {
	const subscribers = paymentSubscribers.get(paymentRequest);

	for (const res of subscribers ?? []) {
		res.write(
			`data: ${JSON.stringify({
				paymentRequest,
			})}\n\n`,
		);
	}
};
