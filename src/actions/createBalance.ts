"use server";

import { BalancePlatform } from "@prisma/client";
import { TypeOf, z } from "zod";
import { lnGrpcClient, promisifyGrpc } from "../lndClient";
import { prisma } from "../prisma";
import { getRoutingFee } from "../utils/getRoutingFee";

const inputSchema = z.object({
  platform: z.nativeEnum(BalancePlatform),
  receiver: z.string(),
  message: z.string(),
  receiverSatsAmount: z.number().min(1),
  donationSatsAmount: z.number().min(1).nullable(),
});

export const createBalance = async (input: TypeOf<typeof inputSchema>) => {
  const { platform, donationSatsAmount, message, receiver, receiverSatsAmount } = inputSchema.parse(input);

  const result = await promisifyGrpc(lnGrpcClient.AddInvoice.bind(lnGrpcClient), {
    memo: `Stack orange invoice`,
    value: receiverSatsAmount + (donationSatsAmount ?? 0) + getRoutingFee(receiverSatsAmount),
  });

  if (!result) {
    throw new Error("Error generating invoice.");
  }

  const balance = await prisma.balances.create({
    data: {
      paymentRequest: result.paymentRequest,
      platform,
      donationSatsAmount,
      receiver,
      receiverSatsAmount,
      message,
    },
  });

  return balance;
};
