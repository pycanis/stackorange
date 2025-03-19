import { Application } from "express";
import { router as claimsRouter } from "./claims";
import { router as paymentsRouter } from "./payments";

export const registerRoutes = (app: Application) => {
    app.use(claimsRouter)
    app.use(paymentsRouter)
}