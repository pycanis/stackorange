import { ClaimStatus, type Claims } from "@repo/database";
import { LAST_UNPAID_CLAIM_ID_KEY } from "@repo/shared";
import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { getClaimsByIds } from "../api/claims";
import { Steps } from "../components/Steps";
import { Form } from "./CreateClaimForm/Form";
import { Payment } from "./Payment";
import { PaymentSuccess } from "./PaymentSuccess";

export const CreateClaim = () => {
  const [unpaidClaimId, setUnpaidClaimId] = useLocalStorageState<string>(LAST_UNPAID_CLAIM_ID_KEY);
  const [unpaidClaim, setUnpaidClaim] = useState<Claims | null>(null);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (!unpaidClaimId) {
      return;
    }

    getClaimsByIds([unpaidClaimId]).then((claims) => {
      if (!claims[0] || claims[0].status !== ClaimStatus.AWAITING_PAYMENT) {
        return;
      }

      setUnpaidClaim(claims[0]);
      setStep(3);
    });
  }, [unpaidClaimId]);

  const handlePaymentSuccess = () => {
    setUnpaidClaimId("");
    setStep(4);
  };

  return (
    <>
      {step < 4 && <Steps currentStep={step} />}

      <div className="bg-black rounded-lg border border-[rgba(255,255,255,0.1)] max-w-lg shadow-2xl p-6">
        {(step === 1 || step === 2) && <Form currentStep={step} setStep={setStep} />}

        {step === 3 && unpaidClaim && <Payment claim={unpaidClaim} onPaymentSuccess={handlePaymentSuccess} />}

        {step === 4 && unpaidClaim && <PaymentSuccess claim={unpaidClaim} onCancel={() => setStep(1)} />}
      </div>
    </>
  );
};
