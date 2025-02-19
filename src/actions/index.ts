import { Platform, PrismaClient } from "@prisma/client";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

const prisma = new PrismaClient();

export const server = {
  getGreeting: defineAction({
    input: z.object({
      name: z.string(),
    }),
    handler: async (input) => {
      await prisma.balances.create({
        data: { platform: Platform.EMAIL, receiver: "email@email.cz", satsAmount: 10 },
      });

      return `Hello, ${input.name}!`;
    },
  }),
};
