import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Textarea } from "../components/Textarea";

enum Platform {
  EMAIL = "EMAIL",
}

type FormValues = {
  platform: Platform;
  receiver: string;
  message: string;
  receiverSatsAmount: number;
  donationSatsAmount: number;
};

export const MainForm = () => {
  const { register, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: { platform: Platform.EMAIL },
  });

  const receiverSatsAmount = watch("receiverSatsAmount");
  const donationSatsAmount = watch("donationSatsAmount");
  const selectedPlatform = watch("platform");

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    console.log({ values });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col h-fit bg-amber-100 p-4 max-w-lg min-w-xs rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.5)] shadow-orange-500"
    >
      <label htmlFor="platform">Platform</label>
      <div id="platform" className="mb-2">
        {Object.values(Platform).map((platform) => (
          <Button
            key={platform}
            type="button"
            onClick={() => setValue("platform", platform)}
            //  className={selectedPlatform === platform ? "primary" : "secondary"}
          >
            {platform}
          </Button>
        ))}
      </div>

      {selectedPlatform === Platform.EMAIL && (
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
      <p className="text-xs">We'll send your message along with the withdrawal link.</p>

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
          <p className="text-xs">Helps cover server costs and motivates further development!</p>
        </label>
      </div>

      {receiverSatsAmount > 0 && donationSatsAmount > 0 ? (
        <p className="mb-2">Total: {receiverSatsAmount + donationSatsAmount} sats</p>
      ) : null}

      <p className="mb-2 text-xs">
        Note: You'll keep the claim to your sats in case the receiver doesn't withdraw them.
      </p>

      <Button type="submit">Send orange pill!</Button>
    </form>
  );
};
