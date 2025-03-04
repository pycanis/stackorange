import { actions } from "astro:actions";
import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { PaymentRequest } from "../components/PaymentRequest";
import { UNPAID_BALANCE_ID_KEY } from "../constants";
import { BalanceForm } from "./BalanceForm";

type Balances = {
  paymentRequest: string;
};

type UnpaidBalance = {
  isLoading: boolean;
  balance: Balances | null;
};

export const Landing = () => {
  const [unpaidBalanceId] = useLocalStorageState<string>(UNPAID_BALANCE_ID_KEY);
  const [unpaidBalance, setUnpaidBalance] = useState<UnpaidBalance>({ isLoading: true, balance: null });

  useEffect(() => {
    if (!unpaidBalanceId) {
      setUnpaidBalance({ balance: null, isLoading: false });

      return;
    }

    actions.unpaidBalance({ balanceId: unpaidBalanceId }).then(({ data, error }) => {
      if (!data || error) {
        setUnpaidBalance({ balance: null, isLoading: false });

        return;
      }

      setUnpaidBalance({ balance: data, isLoading: false });
    });
  }, [unpaidBalanceId]);

  if (unpaidBalance.isLoading) {
    return <>loading..</>;
  }

  if (unpaidBalance.balance) {
    return (
      <PaymentRequest
        paymentRequest={unpaidBalance.balance.paymentRequest}
        onPaymentSuccess={() => {
          console.log("Payment success!");
        }}
      />
    );
  }

  return <BalanceForm />;
};
