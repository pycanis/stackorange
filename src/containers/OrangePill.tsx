"use client";

import { Balances } from "@prisma/client";
import { useEffect, useState } from "react";
import { getBalancesByIds } from "../actions/getBalancesByIds";

type Props = {
  id: string;
};

export const OrangePill = ({ id }: Props) => {
  const [balance, setBalance] = useState<Balances | null>(null);

  useEffect(() => {
    getBalancesByIds({ balanceIds: [id] }).then((balances) => {
      setBalance(balances[0]);
    });
  }, [id]);

  return <div>{balance?.message}</div>;
};
