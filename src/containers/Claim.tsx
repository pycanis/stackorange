"use client";

import { Balances, BalanceStatus } from "@prisma/client";
import { bech32 } from "bech32";
import { useEffect, useState } from "react";
import { getBalancesByIds } from "../actions/getBalancesByIds";
import { Qrcode } from "../components/Qrcode";
import { formatNumber } from "../utils/numbers";

type Props = {
  id: string;
};

export const Claim = ({ id }: Props) => {
  const [balance, setBalance] = useState<Balances | null>(null);

  const withdrawLink = `https://stackorange.com/payments/withdraw/${id}`;
  const withdrawLinkLnurl = bech32
    .encode("lnurl", bech32.toWords(Buffer.from(withdrawLink, "utf8")), 1023)
    .toUpperCase();

  useEffect(() => {
    getBalancesByIds({ balanceIds: [id] }).then((balances) => {
      setBalance(balances[0]);
    });
  }, [id]);

  if (!balance) {
    return null;
  }

  // todo: currency
  // todo: live update after payment
  // todo: already claimed or not paid yet statuses

  return (
    <>
      {balance.status === BalanceStatus.PAID && (
        <div className="flex flex-col items-center gap-2">
          <Qrcode payload={`lightning:${withdrawLinkLnurl}`} />

          <p className="text-sm">
            You can claim <span className="font-bold">{formatNumber(balance.receiverSatsAmount)} sats</span> currently
            valued at <span>{formatNumber(123)}</span>.
          </p>
        </div>
      )}
    </>
  );
};
