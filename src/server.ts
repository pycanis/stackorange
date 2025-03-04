import "dotenv/config";

import express from "express";
// @ts-expect-error
import { handler as ssrHandler } from "../astro/dist/server/entry.mjs";

const app = express();

app.use("/", express.static("astro/dist/client/"));
app.use(ssrHandler);

// app.get("/payment/:paymentRequest", async (req, res) => {
//   const paymentRequest = req.query.paymentRequest;

//   res.setHeader("Content-Type", "text/event-stream");
//   res.setHeader("Cache-Control", "no-cache");
//   res.setHeader("Connection", "keep-alive");
//   res.flushHeaders();

//   const ts = Date.now();

//   res.id = ts;

//   paymentSubscribers.set(paymentRequest, [...(paymentSubscribers.get(paymentRequest) ?? []), res]);

//   req.on("close", () => {
//     paymentSubscribers.set(
//       paymentRequest,
//       (paymentSubscribers.get(paymentRequest) ?? []).filter((rs) => rs.id !== res.id)
//     );
//   });
// });

app.listen(3000, () => {
  console.log("App is running..");
});
