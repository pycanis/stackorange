import "dotenv/config";

import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
// import { handler as ssrHandler } from '../../web/dist/server/entry.mjs';
import { registerRoutes } from "./routers";
import { subscribeInvoices } from "./subscribeInvoices";
import { errorMiddleware } from "./utils/middlewares";

const isDev = process.env.NODE_ENV !== "production";

const app = express();

app.use(
	helmet({
		contentSecurityPolicy: {
			directives: {
				scriptSrc: isDev
					? ["'self'", "'unsafe-eval'", "'unsafe-inline'"]
					: ["'self'"],
			},
		},
	}),
);

if (!isDev) {
	app.use(
		rateLimit({
			windowMs: 5 * 60 * 1000,
			limit: 100,
		}),
	);
}

subscribeInvoices();

registerRoutes(app);

app.use("/", express.static("dist/client/"));
// app.use(ssrHandler);

app.use(errorMiddleware);

app.listen(3000, () => {
	console.log("Server running on http://localhost:3000");
});
