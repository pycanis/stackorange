import { BalanceStatus } from "@prisma/client";
import { Router } from "express";
import { lndClient } from "./lndClient";
import { paymentSubscribers } from "./paymentSubscribers";
import { prisma } from "./prisma";
import { getRequiredStringParams } from "./utils/params";

declare module "express-serve-static-core" {
  interface Response {
    id?: string | number;
  }
}

const router = Router();

router.get("/withdraw", async (req, res) => {
  const { k1, pr } = getRequiredStringParams(req, ["k1", "pr"]);

  const balance = await prisma.balances.findUnique({ where: { id: k1 } });

  if (!balance || balance.status !== BalanceStatus.PAID) {
    res.json({
      status: "ERROR",
      reason: "Claim not found, already claimed or not paid for yet.",
    });

    return;
  }

  const { data } = await lndClient.get<{ num_satoshis: string }>(`/v1/payreq/${pr}`);

  if (Number(data.num_satoshis) !== balance.receiverSatsAmount) {
    res.json({
      status: "ERROR",
      reason: `Claim for ${data.num_satoshis} sats doesn't match the expected claim of ${balance.receiverSatsAmount} sats.`,
    });

    return;
  }

  res.json({ status: "OK" });

  // const {data} = await lndClient.post("/v2/router/send", { payment_request: pr, fee_limit_sat: 10 });
});

router.get("/withdraw/:balanceId", async (req, res) => {
  const { balanceId } = getRequiredStringParams(req, ["balanceId"]);

  const balance = await prisma.balances.findUnique({ where: { id: balanceId } });

  if (!balance || balance.status !== BalanceStatus.PAID) {
    res.json({
      status: "ERROR",
      reason: "Claim not found, already claimed or not paid for yet.",
    });

    return;
  }

  const receiverMilliSats = balance.receiverSatsAmount * 1000;

  res.json({
    tag: "withdrawRequest",
    callback: "https://stackorange.com/payments/withdraw",
    k1: balance.id,
    defaultDescription: "Orange pill from stackorange.com",
    minWithdrawable: receiverMilliSats,
    maxWithdrawable: receiverMilliSats,
  });
});

router.get("/:paymentRequest", async (req, res) => {
  const paymentRequest = req.params.paymentRequest;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const ts = Date.now();

  res.id = ts;

  paymentSubscribers.set(paymentRequest, [...(paymentSubscribers.get(paymentRequest) ?? []), res]);

  req.on("close", () => {
    paymentSubscribers.set(
      paymentRequest,
      (paymentSubscribers.get(paymentRequest) ?? []).filter((rs) => rs.id !== res.id)
    );
  });
});

export { router };
