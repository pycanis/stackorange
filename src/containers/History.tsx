"use client";

import { Balances } from "@prisma/client";
import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { getBalancesByIds } from "../actions/getBalancesByIds";
import { PAID_BALANCE_IDS_KEY } from "../constants";
import { getClaimLink } from "../utils/getClaimLink";
import { truncate } from "../utils/strings";

export const History = () => {
  const [paidBalanceIds] = useLocalStorageState<string[]>(PAID_BALANCE_IDS_KEY);
  const [paidBalances, setPaidBalances] = useState<Balances[]>([]);

  useEffect(() => {
    if (!paidBalanceIds || paidBalanceIds.length === 0) {
      return;
    }

    getBalancesByIds({ balanceIds: paidBalanceIds }).then((balances) => {
      setPaidBalances(balances);
    });
  }, [paidBalanceIds]);

  if (paidBalances.length === 0) {
    return null;
  }

  return (
    <div className="mt-2">
      <details>
        <summary className="text-center cursor-pointer border-b-white border-b-1">Show history</summary>

        <div className="w-full">
          {paidBalances.map((balance) => (
            <div key={balance.id} className="flex justify-between">
              <p className="flex-1">{balance.createdAt.toLocaleDateString()}</p>
              <p className="flex-2 text-center">{balance.receiver}</p>
              <p className="flex-1 text-center">{balance.receiverSatsAmount} sats</p>
              <p className="flex-1 text-center italic">"{truncate(balance.message || "<no message>")}"</p>
              <a
                href={getClaimLink(balance.id)}
                target="_blank"
                className="flex-1 text-orange hover:underline text-end"
              >
                claim link
              </a>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
};
