import { lndClient } from "./lndClient.js";

type Response = {
  payment_request: string;
};

export const getInvoice = async (satsAmount: number) => {
  const { data } = await lndClient.post<Response>("/v1/invoices", {
    memo: `Stack orange invoice`,
    value: satsAmount,
  });

  return data;
};
