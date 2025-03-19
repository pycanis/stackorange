import type { Claims } from "@repo/database";
import { getRoutingFee, ROUTING_FEE_PERCENT } from "@repo/shared";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { Qrcode } from "../components/Qrcode";
import { Button } from "../components/ui/Button";
import { debounce } from "../utils/debounce";
import { formatNumber } from "../utils/numbers";
import { subscribeSSE } from "../utils/sse";

type Props = {
  claim: Claims;
  onPaymentSuccess: () => void;
};
export const Payment = ({ claim, onPaymentSuccess }: Props) => {
  const [copied, setCopied] = useState(false);

  const routingFee = getRoutingFee(claim.receiverSatsAmount);
  const platformSatsAmount = claim.platformSatsAmount || 0;

  const total = claim.receiverSatsAmount + platformSatsAmount + routingFee;

  useEffect(() => {
    const eventSource = subscribeSSE<{ paymentRequest: string }>(
      `/payments/${claim.paymentRequest}`,
      ({ paymentRequest: paymentRequestPaid }) => {
        if (paymentRequestPaid === claim.paymentRequest) {
          onPaymentSuccess();
        }
      }
    );

    return () => {
      eventSource.close();
    };
  }, [claim.paymentRequest, onPaymentSuccess]);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(claim.paymentRequest).then(() => {
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
        Pay the lightning invoice to send {formatNumber(claim.receiverSatsAmount)} sats to {claim.receiver}.
      </p>

      <div className="bg-background rounded-lg border border-white-muted/50 p-2 mb-4 text-sm flex flex-col gap-2">
        <div className="flex justify-between">
          <span className="text-white-muted">Receiver:</span>
          <span className="font-bold">{claim.receiver}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-white-muted">Receiver amount:</span>
          <span className="font-bold">{formatNumber(claim.receiverSatsAmount)} sats</span>
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
        <Qrcode payload={`lightning:${claim.paymentRequest}`} />
      </div>

      <div className="bg-background rounded-lg border border-white-muted/50 p-2 mb-8 text-sm text-white-muted break-words">
        {claim.paymentRequest}
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
