import { Balances } from "@prisma/client";
import { Check, ExternalLink, History, Pill } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../components/Button";
import { getClaimLink } from "../utils/getClaimLink";
import { formatNumber } from "../utils/numbers";

type Props = {
  balance: Balances;
  onCancel: () => void;
};

export const PaymentSuccess = ({ balance, onCancel }: Props) => {
  const router = useRouter();

  return (
    <>
      <div className="flex justify-center items-center w-20 h-20 bg-green-200 rounded-full mx-auto mb-4">
        <Check color="green" size={28} strokeWidth={3} />
      </div>

      <p className="text-center font-bold text-2xl mb-2">Orange pill sucessfully sent!</p>

      <p className="text-center text-white-muted text-lg mb-8">
        {balance.receiver} will receive instructions on how to claim their {formatNumber(balance.receiverSatsAmount)}{" "}
        sats.
      </p>

      <div className="bg-background rounded-lg border border-white-muted/50 p-2 mb-8">
        <p className="font-bold mb-2">Claim link for unclaimed sats</p>

        <p className="text-sm text-white-muted mb-2">
          If the sats aren't claimed within the timeframe you consider reasonable, you can reclaim them yourself.
        </p>

        <a
          href={getClaimLink(balance.id)}
          target="_blank"
          className="text-orange hover:underline flex items-center gap-2"
        >
          <span>Reclaim sats</span>
          <ExternalLink size={16} />
        </a>
      </div>

      <Button className="mt-2 w-full items-center gap-2" onClick={onCancel}>
        <Pill size={18} />
        <span>Send another orange pill</span>
      </Button>

      <Button className="mt-2 w-full items-center gap-2" variant="secondary" onClick={() => router.push("/history")}>
        <History size={18} />
        <span>View orange pill history</span>
      </Button>
    </>
  );
};
