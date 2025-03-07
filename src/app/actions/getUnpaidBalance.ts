"use server";

import { BalanceStatus } from "@prisma/client";
import { TypeOf, z } from "zod";
import { prisma } from "../../prisma";

const inputSchema = z.object({ balanceId: z.string() });

export const getUnpaidBalance = async (input: TypeOf<typeof inputSchema>) => {
  const validInput = inputSchema.parse(input);

  const unpaidBalance = await prisma.balances.findUnique({
    where: { id: validInput.balanceId, status: BalanceStatus.AWAITING_PAYMENT },
  });

  return unpaidBalance;
};
