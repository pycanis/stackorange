"use server";

import { TypeOf, z } from "zod";
import { prisma } from "../prisma";

const inputSchema = z.object({ balanceIds: z.array(z.string()) });

export const getBalancesByIds = async (input: TypeOf<typeof inputSchema>) => {
  const { balanceIds } = inputSchema.parse(input);

  if (balanceIds.length === 0) {
    return [];
  }

  if (balanceIds.length === 1) {
    const balance = await prisma.balances.findUnique({
      where: { id: balanceIds[0] },
    });

    return [balance];
  }

  return await prisma.balances.findMany({
    where: { id: { in: balanceIds } },
    orderBy: { createdAt: "desc" },
  });
};
