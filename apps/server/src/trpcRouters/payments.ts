import { on } from "node:events";
import z from "zod";
import { PAYMENT_SUCCESS_EVENT } from "../constants";
import { ee } from "../eventEmitter";
import { publicProcedure, router } from "../trpc";

const paymentsRouter = router({
	paymentUpdate: publicProcedure.input(z.string()).subscription(async function* ({
		input: paymentId,
		signal,
	}) {
		for await (const [data] of on(ee, PAYMENT_SUCCESS_EVENT, {
			signal,
		})) {
			if (data === paymentId) {
				yield data;
			}
		}
	}),
});

export { paymentsRouter };
