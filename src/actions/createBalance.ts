"use server";

import { BalanceChannel } from "@prisma/client";
import { TypeOf, z } from "zod";
import { lnGrpcClient, promisifyGrpc } from "../lndClient";
import { prisma } from "../prisma";
import { getRoutingFee } from "../utils/getRoutingFee";

const inputSchema = z.object({
  channel: z.nativeEnum(BalanceChannel),
  receiver: z.string(),
  message: z.string(),
  receiverSatsAmount: z.number().min(1),
  platformSatsAmount: z.number().min(1).nullable(),
});

export const createBalance = async (input: TypeOf<typeof inputSchema>) => {
  const { channel, platformSatsAmount, message, receiver, receiverSatsAmount } = inputSchema.parse(input);

  const result = await promisifyGrpc(lnGrpcClient.AddInvoice.bind(lnGrpcClient), {
    memo: `Stack orange invoice`,
    value: receiverSatsAmount + (platformSatsAmount ?? 0) + getRoutingFee(receiverSatsAmount),
  });

  if (!result) {
    throw new Error("Error generating invoice.");
  }

  const balance = await prisma.balances.create({
    data: {
      paymentRequest: result.paymentRequest,
      channel,
      platformSatsAmount,
      receiver,
      receiverSatsAmount,
      message,
    },
  });

  return balance;
};
