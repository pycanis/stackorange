import { useForm, type SubmitHandler } from "react-hook-form";
import useLocalStorageState from "use-local-storage-state";
import { createBalance } from "../actions/createBalance";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Textarea } from "../components/Textarea";
import { ROUTING_FEE_PERCENT, UNPAID_BALANCE_ID_KEY } from "../constants";
import { getRoutingFee } from "../utils/getRoutingFee";

enum BalancePlatform {
  EMAIL = "EMAIL",
}

type FormValues = {
  platform: BalancePlatform;
  receiver: string;
  message: string;
  receiverSatsAmount: number;
  donationSatsAmount: number;
};

export const BalanceForm = () => {
  const [_, setUnpaidBalanceId] = useLocalStorageState<string>(UNPAID_BALANCE_ID_KEY);
  const { register, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: { platform: BalancePlatform.EMAIL },
  });

  const receiverSatsAmount = watch("receiverSatsAmount") || 0;
  const donationSatsAmount = watch("donationSatsAmount") || 0;
  const selectedPlatform = watch("platform");

  const routingFee = getRoutingFee(receiverSatsAmount);
  const total = receiverSatsAmount + donationSatsAmount + routingFee;

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const balance = await createBalance({
      ...values,
      donationSatsAmount: isNaN(values.donationSatsAmount) ? null : values.donationSatsAmount,
    });

    if (!balance) {
      return alert("Something went wrong");
    }

    setUnpaidBalanceId(balance.id);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label htmlFor="platform">Platform</label>
      <div id="platform" className="mb-2 flex gap-2 flex-wrap">
        {Object.values(BalancePlatform).map((platform) => (
          <Button
            key={platform}
            type="button"
            onClick={() => setValue("platform", platform)}
            className="text-sm"
            disabled={platform !== BalancePlatform.EMAIL}
          >
            {platform}
          </Button>
        ))}
      </div>

      {selectedPlatform === BalancePlatform.EMAIL && (
        <>
          <label htmlFor="receiver">Email</label>
          <Input
            {...register("receiver", { required: true })}
            id="receiver"
            type="email"
            placeholder="name@proton.me"
          />
        </>
      )}

      <label htmlFor="message" className="mt-2">
        Message
      </label>
      <Textarea {...register("message")} id="message" rows={3} placeholder="Enter your message..."></Textarea>
      <p className="text-sm">We&apos;ll send your message along with the withdrawal link.</p>

      <div className="flex gap-2 my-2">
        <label className="flex-1">
          Receiver amount (sats)
          <Input
            {...register("receiverSatsAmount", { min: 1, required: true, valueAsNumber: true })}
            type="number"
            placeholder="10000"
            inputMode="numeric"
            pattern="[0-9]*"
          />
        </label>

        <label className="flex-1">
          Support this project (sats)
          <Input
            {...register("donationSatsAmount", { min: 0, valueAsNumber: true })}
            type="number"
            placeholder="5000"
            inputMode="numeric"
            pattern="[0-9]*"
          />
          <p className="text-sm">Helps cover server costs and motivates further development!</p>
        </label>
      </div>

      <p className="mb-2">
        Total: <span className="font-bold">{total}</span> sats{" "}
        {routingFee > 0 && (
          <span className="text-sm">
            (including {routingFee} sat{routingFee > 1 ? "s" : ""} ({ROUTING_FEE_PERCENT}%) routing fee)
          </span>
        )}
      </p>

      <p className="mb-2 text-sm">
        Note: You&apos;ll keep the claim to your sats in case the receiver doesn&apos;t withdraw them.
      </p>

      <Button type="submit">Send the orange pill!</Button>
    </form>
  );
};
