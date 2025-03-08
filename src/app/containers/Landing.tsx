"use client";

import { Balances } from "@prisma/client";
import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { getUnpaidBalance } from "../actions/getUnpaidBalance";
import { PaymentRequest } from "../components/PaymentRequest";
import { UNPAID_BALANCE_ID_KEY } from "../constants";
import { BalanceForm } from "./BalanceForm";
import { PaymentSuccess } from "./PaymentSuccess";

export const Landing = () => {
  const [unpaidBalanceId, setUnpaidBalanceId] = useLocalStorageState<string>(UNPAID_BALANCE_ID_KEY);
  const [unpaidBalance, setUnpaidBalance] = useState<Balances | null>(null);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

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

  if (isPaymentSuccess && unpaidBalance) {
    return (
      <PaymentSuccess
        balance={unpaidBalance}
        onCancel={() => {
          setUnpaidBalanceId("");
          setUnpaidBalance(null);
          setIsPaymentSuccess(false);
        }}
      />
    );
  }

  if (unpaidBalance) {
    return (
      <PaymentRequest
        paymentRequest={unpaidBalance.paymentRequest}
        onSuccess={() => {
          setUnpaidBalanceId("");
          setIsPaymentSuccess(true);
        }}
        onCancel={() => {
          setUnpaidBalanceId("");
          setUnpaidBalance(null);
        }}
      />
    );
  }

  return <BalanceForm />;
};
