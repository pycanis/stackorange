"use server";

import { BalancePlatform } from "@prisma/client";
import { TypeOf, z } from "zod";
import { getInvoice } from "../../getInvoice";
import { prisma } from "../../prisma";

const inputSchema = z.object({
  platform: z.nativeEnum(BalancePlatform),
  receiver: z.string(),
  message: z.string(),
  receiverSatsAmount: z.number().min(1),
  donationSatsAmount: z.number().min(1).nullable(),
});

export const createBalance = async (input: TypeOf<typeof inputSchema>) => {
  const { platform, donationSatsAmount, message, receiver, receiverSatsAmount } = inputSchema.parse(input);

  const { payment_request } = await getInvoice(receiverSatsAmount + (donationSatsAmount ?? 0));

  const balance = await prisma.balances.create({
    data: {
      paymentRequest: payment_request,
      platform,
      donationSatsAmount,
      receiver,
      receiverSatsAmount,
      message,
    },
  });

  return balance;
};
