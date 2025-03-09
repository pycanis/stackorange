"use server";

import { TypeOf, z } from "zod";
import { prisma } from "../../prisma";

const inputSchema = z.object({ balanceIds: z.array(z.string()) });

export const getBalancesByIds = async (input: TypeOf<typeof inputSchema>) => {
  const { balanceIds } = inputSchema.parse(input);

  const balances = await prisma.balances.findMany({
    where: { id: { in: balanceIds } },
    orderBy: { createdAt: "desc" },
  });

  return balances;
};
