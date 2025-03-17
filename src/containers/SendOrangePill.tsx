"use client";

import { Balances, BalanceStatus } from "@prisma/client";
import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { getBalancesByIds } from "../actions/getBalancesByIds";
import { Steps } from "../components/Steps";
import { LAST_UNPAID_BALANCE_ID_KEY } from "../constants";
import { Form } from "./OrangePillForm/Form";
import { Payment } from "./Payment";
import { PaymentSuccess } from "./PaymentSuccess";

export const SendOrangePill = () => {
  const [unpaidBalanceId, setUnpaidBalanceId] = useLocalStorageState<string>(LAST_UNPAID_BALANCE_ID_KEY);
  const [unpaidBalance, setUnpaidBalance] = useState<Balances | null>(null);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (!unpaidBalanceId) {
      return;
    }

    getBalancesByIds({ balanceIds: [unpaidBalanceId] }).then((balances) => {
      if (!balances[0] || balances[0].status !== BalanceStatus.AWAITING_PAYMENT) {
        return;
      }

      setUnpaidBalance(balances[0]);
      setStep(3);
    });
  }, [unpaidBalanceId]);

  const handlePaymentSuccess = () => {
    setUnpaidBalanceId("");
    setStep(4);
  };

  return (
    <>
      {step < 4 && <Steps currentStep={step} />}

      <div className="bg-black rounded-lg border border-[rgba(255,255,255,0.1)] max-w-lg shadow-2xl p-6">
        {(step === 1 || step === 2) && <Form currentStep={step} setStep={setStep} />}

        {step === 3 && unpaidBalance && <Payment balance={unpaidBalance} onPaymentSuccess={handlePaymentSuccess} />}

        {step === 4 && unpaidBalance && <PaymentSuccess balance={unpaidBalance} onCancel={() => setStep(1)} />}
      </div>
    </>
  );
};
