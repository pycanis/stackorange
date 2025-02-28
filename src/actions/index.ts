import { Platform } from "@prisma/client";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const server = {
  send: defineAction({
    input: z.object({
      platform: z.nativeEnum(Platform),
      receiver: z.string(),
      message: z.string(),
      receiverSatsAmount: z.number().min(1),
      donationSatsAmount: z.number().min(1).nullable(),
    }),
    handler: async (input, ctx) => {
      return input;
    },
  }),
};
