"use client";

import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { getUnpaidBalance } from "../actions/getUnpaidBalance";
import { PaymentRequest } from "../components/PaymentRequest";
import { UNPAID_BALANCE_ID_KEY } from "../constants";
import { BalanceForm } from "./BalanceForm";

type Balances = {
  paymentRequest: string;
};

export const Landing = () => {
  const [unpaidBalanceId] = useLocalStorageState<string>(UNPAID_BALANCE_ID_KEY);
  const [unpaidBalance, setUnpaidBalance] = useState<Balances | null>(null);

  useEffect(() => {
    if (!unpaidBalanceId) {
      return;
    }

    getUnpaidBalance({ balanceId: unpaidBalanceId }).then((balance) => {
      if (!balance) {
        return;
      }

      setUnpaidBalance(balance);
    });
  }, [unpaidBalanceId]);

  if (unpaidBalance) {
    return (
      <PaymentRequest
        paymentRequest={unpaidBalance.paymentRequest}
        onPaymentSuccess={() => {
          console.log("Payment success!");
        }}
      />
    );
  }

  return <BalanceForm />;
};
