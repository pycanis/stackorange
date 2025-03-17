import { BalanceChannel } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import useLocalStorageState from "use-local-storage-state";
import { createBalance } from "../../actions/createBalance";
import { HISTORY_BALANCE_IDS_KEY, LAST_UNPAID_BALANCE_ID_KEY } from "../../constants";
import { Amount } from "./Amount";
import { Receiver } from "./Receiver";

export type FormValues = {
  channel: BalanceChannel;
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
  const [__, setPastBalanceIds] = useLocalStorageState<string[]>(HISTORY_BALANCE_IDS_KEY);
  const [_, setUnpaidBalanceId] = useLocalStorageState<string>(LAST_UNPAID_BALANCE_ID_KEY);

  const methods = useForm<FormValues>({
    defaultValues: { channel: BalanceChannel.EMAIL },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const balance = await createBalance({
      ...values,
      platformSatsAmount: isNaN(values.platformSatsAmount) ? null : values.platformSatsAmount,
    });

    if (!balance) {
      return alert("Something went wrong");
    }

    setStep((step) => step + 1);
    setUnpaidBalanceId(balance.id);
    setPastBalanceIds((pastBalanceIds) => [...(pastBalanceIds || []), balance.id]);
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
