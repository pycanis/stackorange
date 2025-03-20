import type { Application } from "express";
import { router as claimsRouter } from "./claims";
import { router as paymentsRouter } from "./payments";

export const registerRoutes = (app: Application) => {
	app.use("/api/claims", claimsRouter);
	app.use("/api/payments", paymentsRouter);
};
