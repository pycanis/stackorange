import { Invoice__Output } from "../protos/generated/lnrpc/Invoice";
import { handleIncomingPayment } from "./handleIncomingPayment";
import { lnGrpcClient } from "./lndClient";

let reconnectAttempts = 0;
let lastSettleIndex: number | undefined = undefined;

const reconnect = () => {
  const delay = Math.min(5000 * 2 ** reconnectAttempts, 60000);

  console.log(`Subscribing to invoices in ${delay / 1000} seconds..`);

  setTimeout(() => {
    reconnectAttempts++;

    subscribeInvoices();
  }, delay);
};

export const subscribeInvoices = () => {
  const stream = lnGrpcClient.SubscribeInvoices({
    settleIndex: lastSettleIndex,
  });

  stream.on("data", (data: Invoice__Output) => {
    reconnectAttempts = 0;

    if (data.state === "SETTLED") {
      lastSettleIndex = Number(data.settleIndex);
    }

    handleIncomingPayment(data);
  });

  stream.on("error", (err) => {
    console.log("Subscribe invoice error: ", err);

    reconnect();
  });

  stream.on("end", () => {
    reconnect();
  });
};
