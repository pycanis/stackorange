import { useEffect, useState } from "react";
import { debounce } from "../utils/debounce";
import { Button } from "./Button";
import { Qrcode } from "./Qrcode";

export const subscribeSSE = <T,>(url: string, messageHandler: (data: T) => void) => {
  const eventSource = new EventSource(url);

  eventSource.onmessage = (event) => {
    const newMessage = JSON.parse(event.data);

    messageHandler(newMessage);
  };

  eventSource.onerror = (error) => {
    console.error("SSE error:", error);

    eventSource.close();
  };

  return eventSource;
};

type Props = {
  paymentRequest: string;
  onSuccess: () => void;
  onCancel?: () => void;
};

export const PaymentRequest = ({ paymentRequest, onSuccess, onCancel }: Props) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const eventSource = subscribeSSE<{ paymentRequest: string }>(
      `/payments/${paymentRequest}`,
      ({ paymentRequest: paymentRequestPaid }) => {
        if (paymentRequestPaid === paymentRequest) {
          onSuccess();
        }
      }
    );

    return () => {
      eventSource.close();
    };
  }, [paymentRequest, onSuccess]);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(paymentRequest).then(() => {
      setCopied(true);

      debounce(() => {
        setCopied(false);
      }, 3000);
    });
  };

  return (
    <>
      <div className="flex flex-col mb-4 gap-4">
        <Qrcode payload={`lightning:${paymentRequest}`} />

        <p className="break-all">
          {paymentRequest}{" "}
          <span className={copied ? "" : "hover:cursor-pointer"} onClick={copied ? undefined : handleCopyToClipboard}>
            {copied ? "✅" : "📎"}
          </span>
        </p>
      </div>

      {onCancel && (
        <Button onClick={onCancel} className="mt-2">
          Cancel
        </Button>
      )}
    </>
  );
};
