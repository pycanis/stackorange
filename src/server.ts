import "dotenv/config";

import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import next from "next";
import { router as paymentsRouter } from "./payments";
import { subscribeInvoices } from "./subscribeInvoices";
import { errorMiddleware } from "./utils/middlewares";
import { routeHandler } from "./utils/routeHandler";

const isDev = process.env.NODE_ENV !== "production";

const nextApp = next({ dev: isDev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const server = express();

  server.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          scriptSrc: isDev ? ["'self'", "'unsafe-eval'", "'unsafe-inline'"] : ["'self'"],
        },
      },
    })
  );

  if (!isDev) {
    server.use(
      rateLimit({
        windowMs: 5 * 60 * 1000,
        limit: 100,
      })
    );
  }

  subscribeInvoices();

  server.use("/payments", paymentsRouter);

  server.all(
    "*",
    routeHandler((req, res) => {
      return handle(req, res);
    })
  );

  server.use(errorMiddleware);

  server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
});
