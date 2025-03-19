import { ClaimChannel } from "@repo/database";
import { HISTORY_CLAIM_IDS_KEY, LAST_UNPAID_CLAIM_ID_KEY } from "@repo/shared";
import { type Dispatch, type SetStateAction } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import useLocalStorageState from "use-local-storage-state";
import { createClaim } from "../../api/claims";
import { Amount } from "./Amount";
import { Receiver } from "./Receiver";

export type FormValues = {
  channel: ClaimChannel;
  receiver: string;
  message: string;
  receiverSatsAmount: number;
  platformSatsAmount: number;
};

type Props = {
  currentStep: number;
  setStep: Dispatch<SetStateAction<number>>;
};

export const Form = ({ currentStep, setStep }: Props) => {
  const [__, setPastClaimIds] = useLocalStorageState<string[]>(HISTORY_CLAIM_IDS_KEY);
  const [_, setUnpaidClaimId] = useLocalStorageState<string>(LAST_UNPAID_CLAIM_ID_KEY);

  const methods = useForm<FormValues>({
    defaultValues: { channel: ClaimChannel.EMAIL },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
   const claim = await createClaim({
    ...values,
    platformSatsAmount: isNaN(values.platformSatsAmount) ? null : values.platformSatsAmount,
  })

    if (!claim) {
      return alert("Something went wrong");
    }

    setStep((step) => step + 1);
    setUnpaidClaimId(claim.id);
    setPastClaimIds((pastClaimIds) => [...(pastClaimIds || []), claim.id]);
  };

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col">
        {currentStep === 1 && <Receiver setStep={setStep} />}

        {currentStep === 2 && <Amount setStep={setStep} onSubmit={onSubmit} />}
      </form>
    </FormProvider>
  );
};
