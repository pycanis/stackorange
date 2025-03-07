import qrcode from "qrcode";
import { useEffect, useState } from "react";
import { debounce } from "../utils/debounce";

export const subscribeSSE = <T extends unknown>(url: string, messageHandler: (data: T) => void) => {
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
  onPaymentSuccess: () => void;
};

export const PaymentRequest = ({ paymentRequest, onPaymentSuccess }: Props) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    qrcode.toCanvas(document.getElementById("canvas"), `lightning:${paymentRequest}`);

    const eventSource = subscribeSSE<{ paymentRequestPaid: string }>(
      `/payment/${paymentRequest}`,
      ({ paymentRequestPaid }) => {
        if (paymentRequestPaid === paymentRequest) {
          onPaymentSuccess();
        }
      }
    );

    return () => {
      eventSource.close();
    };
  }, [paymentRequest, onPaymentSuccess]);

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
        <canvas id="canvas" />

        <p className="break-all">
          {paymentRequest}{" "}
          <span className={copied ? "" : "hover:cursor-pointer"} onClick={copied ? undefined : handleCopyToClipboard}>
            {copied ? "✅" : "📎"}
          </span>
        </p>
      </div>

      <p>If the screen doesn't automatically refresh after the payment, please do so yourself.</p>
    </>
  );
};
