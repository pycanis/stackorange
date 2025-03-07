import { z } from "zod";
import { handleIncomingPayment } from "./handleIncomingPayment";
import { lndClient } from "./lndClient";

const maxRetries = 5;

const handleReconnect = (retryCount: number) => {
  retryCount += 1;

  if (retryCount > maxRetries) {
    console.error("Max lnd connection retries reached. Giving up..");

    return;
  }

  const backoffDelay = 1000 * retryCount;

  setTimeout(() => {
    subscribeInvoices();
  }, backoffDelay);
};

const subscribe = (retryCount: number) => {
  lndClient
    .get("/v1/invoices/subscribe", {
      responseType: "stream",
    })
    .then(({ data: subscriber }) => {
      let buffer = "";
      retryCount = 0;

      subscriber.on("data", (data: Buffer) => {
        buffer += data.toString();

        try {
          const message = JSON.parse(buffer);

          buffer = "";

          const { state, payment_request } = z
            .object({
              state: z.string(),
              payment_request: z.string(),
            })
            .parse(message.result);

          handleIncomingPayment({
            state,
            paymentRequest: payment_request,
          });
        } catch {}
      });

      subscriber.on("end", () => {
        handleReconnect(retryCount);
      });

      subscriber.on("error", () => {
        handleReconnect(retryCount);
      });
    })
    .catch(() => {
      handleReconnect(retryCount);
    });
};

export const subscribeInvoices = () => {
  let retryCount = 0;

  subscribe(retryCount);
};
