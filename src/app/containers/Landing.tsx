"use client";

import { Balances, BalanceStatus } from "@prisma/client";
import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { getBalancesByIds } from "../actions/getBalancesByIds";
import { PaymentRequest } from "../components/PaymentRequest";
import { PAID_BALANCE_IDS_KEY, UNPAID_BALANCE_ID_KEY } from "../constants";
import { BalanceForm } from "./BalanceForm";
import { PaymentSuccess } from "./PaymentSuccess";

export const Landing = () => {
  const [paidBalanceIds, setPaidBalanceIds] = useLocalStorageState<string[]>(PAID_BALANCE_IDS_KEY);
  const [unpaidBalanceId, setUnpaidBalanceId] = useLocalStorageState<string>(UNPAID_BALANCE_ID_KEY);
  const [unpaidBalance, setUnpaidBalance] = useState<Balances | null>(null);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  useEffect(() => {
    if (!unpaidBalanceId) {
      return;
    }

    getBalancesByIds({ balanceIds: [unpaidBalanceId] }).then((balances) => {
      if (!balances[0] || balances[0].status !== BalanceStatus.AWAITING_PAYMENT) {
        return;
      }

      setUnpaidBalance(balances[0]);
    });
  }, [unpaidBalanceId]);

  if (isPaymentSuccess && unpaidBalance) {
    return (
      <PaymentSuccess
        balance={unpaidBalance}
        onCancel={() => {
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
          setPaidBalanceIds([...(paidBalanceIds || []), unpaidBalance.id]);
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
