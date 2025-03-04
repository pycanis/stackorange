import "dotenv/config";

import express from "express";
import { paymentSubscribers } from "./paymentSubscribers.js";
import { subscribeInvoices } from "./subscribeInvoices.js";

(async () => {
  const app = express();

  // @ts-expect-error
  const { handler } = await import("../astro/dist/server/entry.mjs");

  app.use("/", express.static("astro/dist/client/"));
  app.use(handler);

  subscribeInvoices();

  app.get("/payment/:paymentRequest", async (req, res) => {
    const paymentRequest = req.params.paymentRequest;

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    const ts = Date.now();

    // @ts-ignore
    res.id = ts;

    paymentSubscribers.set(paymentRequest, [...(paymentSubscribers.get(paymentRequest) ?? []), res]);

    req.on("close", () => {
      paymentSubscribers.set(
        paymentRequest,
        // @ts-ignore
        (paymentSubscribers.get(paymentRequest) ?? []).filter((rs) => rs.id !== res.id)
      );
    });
  });

  app.listen(3000, () => {
    console.log("App is running on http://localhost:3000");
  });
})();
