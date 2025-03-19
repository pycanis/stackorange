import fs from "node:fs";
import { handleIncomingPayment } from "./handleIncomingPayment";
import { lnGrpcClient } from "./lndClient";
import type { Invoice__Output } from "./protos/generated/lnrpc/Invoice";

const LAST_SETTLE_INDEX_FILE = "last_settle_index.txt";

// The first settle index must be 1 due to bug in lnd
// https://github.com/lightningnetwork/lnd/issues/2469
const loadLastSettleIndex = () => {
	if (fs.existsSync(LAST_SETTLE_INDEX_FILE)) {
		return (
			Number.parseInt(fs.readFileSync(LAST_SETTLE_INDEX_FILE, "utf-8"), 10) || 1
		);
	}

	return 1;
};

const saveLastSettleIndex = (index: number) => {
	fs.writeFileSync(LAST_SETTLE_INDEX_FILE, index.toString());
};

let reconnectAttempts = 0;
let lastSettleIndex = loadLastSettleIndex();

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
			saveLastSettleIndex(lastSettleIndex);
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
