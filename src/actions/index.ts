import { BalancePlatform } from "@prisma/client";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { getInvoice } from "./getInvoice";
import { prisma } from "./prisma";

export const server = {
  send: defineAction({
    input: z.object({
      platform: z.nativeEnum(BalancePlatform),
      receiver: z.string(),
      message: z.string(),
      receiverSatsAmount: z.number().min(1),
      donationSatsAmount: z.number().min(1).nullable(),
    }),
    handler: async (input) => {
      const { platform, donationSatsAmount, message, receiver, receiverSatsAmount } = input;

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
    },
  }),
};
