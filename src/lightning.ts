import { Application } from "express";
import { paymentSubscribers } from "./paymentSubscribers";

export const registerLightningRoutes = (server: Application) => {
  server.get("/payment/:paymentRequest", async (req, res) => {
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
};
