import { router } from "../trpc";
import { claimsRouter } from "./claims";
import { paymentsRouter } from "./payments";

export const appRouter = router({
	claims: claimsRouter,
	payments: paymentsRouter,
});

export type AppRouter = typeof appRouter;
