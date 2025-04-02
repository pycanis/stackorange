import "dotenv/config";

import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { subscribeInvoices } from "./subscribeInvoices";
import { createContext } from "./trpc";
import { appRouter } from "./trpcRouters";
import { router as withdrawRouter } from "./withdrawRouter";

(async () => {
	const isProd = process.env.NODE_ENV === "production";
	const plausibleUrl = "https://plausible.stackorange.com";

	const app = express();

	app.use(express.json());

	app.set("trust proxy", 2); // todo: should be stricter?

	app.use(
		helmet({
			contentSecurityPolicy: {
				directives: {
					scriptSrc: isProd
						? ["'self'", "'unsafe-inline'", plausibleUrl] // astro needs 'unsafe-inline'
						: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
					connectSrc: ["'self'", "https://api.coingecko.com", plausibleUrl],
				},
			},
		}),
	);

	if (!isProd) {
		app.use(cors());
	}

	if (isProd) {
		app.use(
			rateLimit({
				windowMs: 5 * 60 * 1000,
				limit: 100,
			}),
		);
	}

	subscribeInvoices();

	app.use("/api/withdraw", withdrawRouter);

	app.use(
		"/api",
		createExpressMiddleware({
			router: appRouter,
			createContext,
			allowBatching: false,
		}),
	);

	if (isProd) {
		const { handler: webHandler } = await import(
			// @ts-expect-error
			"../dist-web/server/entry.mjs"
		);

		app.use("/", express.static("dist-web/client/"));
		app.use(webHandler);
	}

	app.listen(3000, () => {
		console.log("Server running on http://localhost:3000");
	});
})();
