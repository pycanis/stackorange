import "dotenv/config";

import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { registerRoutes } from "./routers";
import { subscribeInvoices } from "./subscribeInvoices";
import { errorMiddleware } from "./utils/middlewares";

(async () => {
	const isProd = process.env.NODE_ENV === "production";

	const app = express();

	app.use(express.json());

	app.use(
		helmet({
			contentSecurityPolicy: {
				directives: {
					scriptSrc: isProd ? ["'self'"] : ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
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

	registerRoutes(app);

	if (isProd) {
		const { handler: webHandler } = await import(
			// @ts-expect-error
			"../dist-web/server/entry.mjs"
		);

		app.use("/", express.static("dist-web/client/"));
		app.use(webHandler);
	}

	app.use(errorMiddleware);

	app.listen(3000, () => {
		console.log("Server running on http://localhost:3000");
	});
})();
