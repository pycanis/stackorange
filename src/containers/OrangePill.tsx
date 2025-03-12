"use client";

import { Balances } from "@prisma/client";
import { bech32 } from "bech32";
import { useEffect, useState } from "react";
import { getBalancesByIds } from "../actions/getBalancesByIds";
import { Qrcode } from "../components/Qrcode";

type Props = {
  id: string;
};

export const OrangePill = ({ id }: Props) => {
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

  return (
    <div>
      <Qrcode payload={`lightning:${withdrawLinkLnurl}`} />
      <p>{balance?.message}</p>
    </div>
  );
};
