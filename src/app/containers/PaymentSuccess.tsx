import { Balances } from "@prisma/client";
import { Button } from "../components/Button";
import { getClaimLink } from "../utils/getClaimLink";

type Props = {
  balance: Balances;
  onCancel: () => void;
};

export const PaymentSuccess = ({ balance, onCancel }: Props) => {
  return (
    <div>
      <p className="mb-4 text-2xl font-bold">Payment successful!</p>

      <p className="mb-2">
        Receiver <span className="font-bold">{balance.receiver}</span> has been sent a{" "}
        <a href={getClaimLink(balance.id)} target="_blank" className="text-orange hover:underline">
          link to claim
        </a>{" "}
        their <span className="font-bold">{balance.receiverSatsAmount}</span> sats, along with{" "}
        {balance.message && "your message and"} some orange-pilling resources.
      </p>

      {balance.message && (
        <p className="mb-2">
          <span className="italic">"{balance.message}"</span>
        </p>
      )}

      <p>
        <span className="font-bold">P.S.</span> You can claim the sats back yourself if they don't!
      </p>

      {balance.donationSatsAmount && (
        <p className="mb-2">
          <span className="font-bold">P.S. 2</span> Thank you for supporting the project with{" "}
          <span className="font-bold">{balance.donationSatsAmount}</span> sats!
        </p>
      )}

      <Button onClick={onCancel}>Send another orange pill</Button>
    </div>
  );
};
