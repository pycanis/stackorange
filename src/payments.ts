import { BalanceStatus } from "@prisma/client";
import { Mutex, MutexInterface, withTimeout } from "async-mutex";
import { Router } from "express";
import { Payment__Output } from "../protos/generated/lnrpc/Payment";
import { lnGrpcClient, promisifyGrpc, routerGrpcClient } from "./lndClient";
import { paymentSubscribers } from "./paymentSubscribers";
import { prisma } from "./prisma";
import { getRoutingFee } from "./utils/getRoutingFee";
import { getRequiredStringParams } from "./utils/params";
import { routeHandler } from "./utils/routeHandler";

declare module "express-serve-static-core" {
  interface Response {
    id?: string | number;
  }
}

const mutexes = new Map<string, MutexInterface>();

const router = Router();

router.get(
  "/withdraw",
  routeHandler(async (req, res) => {
    const { k1, pr } = getRequiredStringParams(req, ["k1", "pr"]);

    if (!mutexes.has(k1)) {
      mutexes.set(k1, withTimeout(new Mutex(), 15 * 1000)); // todo
    }

    const mutex = mutexes.get(k1)!;

    const release = await mutex.acquire();

    const balance = await prisma.balances.findUnique({ where: { id: k1 } });

    if (!balance || balance.status !== BalanceStatus.PAID) {
      res.json({
        status: "ERROR",
        reason: "Claim not found, already claimed or not paid for yet.",
      });

      release();

      return;
    }

    const result = await promisifyGrpc(lnGrpcClient.DecodePayReq.bind(lnGrpcClient), {
      payReq: pr,
    });

    if (!result) {
      res.json({
        status: "ERROR",
        reason: `Invalid pr.`,
      });

      release();

      return;
    }

    if (Number(result.numSatoshis) !== balance.receiverSatsAmount) {
      res.json({
        status: "ERROR",
        reason: `Claim for ${result.numSatoshis} sats doesn't match the expected claim of ${balance.receiverSatsAmount} sats.`,
      });

      release();

      return;
    }

    res.json({ status: "OK" });

    const stream = routerGrpcClient.SendPaymentV2({
      paymentRequest: pr,
      feeLimitSat: getRoutingFee(balance.receiverSatsAmount),
      timeoutSeconds: 15, // todo
    });

    stream.on("data", async (data: Payment__Output) => {
      if (data.status === "SUCCEEDED") {
        await prisma.balances.update({ where: { id: k1 }, data: { status: BalanceStatus.CLAIMED } });

        release();
      }
    });

    stream.on("error", (err) => {
      console.log("Error happened during payment stream: ", err);

      release();
    });
  })
);

router.get(
  "/withdraw/:balanceId",
  routeHandler(async (req, res) => {
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
  })
);

router.get(
  "/:paymentRequest",
  routeHandler(async (req, res) => {
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
  })
);

export { router };
