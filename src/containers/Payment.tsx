import { Balances } from "@prisma/client";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Qrcode } from "../components/Qrcode";
import { ROUTING_FEE_PERCENT } from "../constants";
import { debounce } from "../utils/debounce";
import { getRoutingFee } from "../utils/getRoutingFee";
import { formatNumber } from "../utils/numbers";
import { subscribeSSE } from "../utils/sse";

type Props = {
  balance: Balances;
  onPaymentSuccess: () => void;
};
export const Payment = ({ balance, onPaymentSuccess }: Props) => {
  const [copied, setCopied] = useState(false);

  const routingFee = getRoutingFee(balance.receiverSatsAmount);
  const platformSatsAmount = balance.platformSatsAmount || 0;

  const total = balance.receiverSatsAmount + platformSatsAmount + routingFee;

  useEffect(() => {
    const eventSource = subscribeSSE<{ paymentRequest: string }>(
      `/payments/${balance.paymentRequest}`,
      ({ paymentRequest: paymentRequestPaid }) => {
        if (paymentRequestPaid === balance.paymentRequest) {
          onPaymentSuccess();
        }
      }
    );

    return () => {
      eventSource.close();
    };
  }, [balance.paymentRequest, onPaymentSuccess]);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(balance.paymentRequest).then(() => {
      setCopied(true);

      debounce(() => {
        setCopied(false);
      }, 3000);
    });
  };

  return (
    <>
      <p className="text-center font-bold text-2xl mb-2">Complete your payment</p>

      <p className="text-center text-white-muted text-lg mb-4">
        Pay the lightning invoice to send {formatNumber(balance.receiverSatsAmount)} sats to {balance.receiver}.
      </p>

      <div className="bg-background rounded-lg border border-white-muted/50 p-2 mb-4 text-sm flex flex-col gap-2">
        <div className="flex justify-between">
          <span className="text-white-muted">Receiver:</span>
          <span className="font-bold">{balance.receiver}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-white-muted">Receiver amount:</span>
          <span className="font-bold">{formatNumber(balance.receiverSatsAmount)} sats</span>
        </div>

        {platformSatsAmount > 0 && (
          <div className="flex justify-between">
            <span className="text-white-muted">Platform support:</span>
            <span className="font-bold">{formatNumber(platformSatsAmount)} sats</span>
          </div>
        )}

        {routingFee > 0 && (
          <div className="flex justify-between">
            <span className="text-white-muted">Routing fee ({ROUTING_FEE_PERCENT}%):</span>
            <span className="font-bold">
              {formatNumber(routingFee)} sat{routingFee === 1 ? "" : "s"}
            </span>
          </div>
        )}

        <div className="h-[1px] w-full bg-white" />

        <div className="flex justify-between">
          <span className="text-white-muted">Total:</span>
          <span className="font-bold">
            {formatNumber(total)} sat{total === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      <div className="mb-2 flex justify-between items-center">
        <span className="font-bold">Lightning invoice</span>

        <Button variant="text" onClick={handleCopyToClipboard} disabled={copied}>
          {copied ? <Check size={18} className="mr-2 mt-0.5" /> : <Copy size={18} className="mr-2 mt-0.5" />}
          <span className="font-bold text-sm">{copied ? "Copied!" : "Copy"}</span>
        </Button>
      </div>

      <div className="flex justify-center mb-4">
        <Qrcode payload={`lightning:${balance.paymentRequest}`} />
      </div>

      <div className="bg-background rounded-lg border border-white-muted/50 p-2 mb-8 text-sm text-white-muted break-words">
        {balance.paymentRequest}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "0ms" }}></div>
        <div className="h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "200ms" }}></div>
        <div className="h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "400ms" }}></div>
      </div>

      <p className="text-center text-white-muted">Waiting for payment confirmation..</p>
    </>
  );
};
