import {
	type Claims,
	LAST_UNPAID_CLAIM_ID_KEY,
	ROUTING_FEE_PERCENT,
	getRoutingFee,
} from "@repo/shared";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { Qrcode } from "../components/Qrcode";
import { Button } from "../components/ui/Button";
import { debounce } from "../utils/debounce";
import { formatNumber } from "../utils/numbers";
import { subscribeSSE } from "../utils/sse";

type Props = {
	claim: Claims;
	onSuccess: () => void;
	onCancel: () => void;
};

export const Payment = ({ claim, onSuccess, onCancel }: Props) => {
	const [_, setLastUnpaidClaimId] = useLocalStorageState(LAST_UNPAID_CLAIM_ID_KEY);
	const [copied, setCopied] = useState(false);

	const routingFee = getRoutingFee(claim.receiverSatsAmount);
	const platformSatsAmount = claim.platformSatsAmount || 0;

	const total = claim.receiverSatsAmount + platformSatsAmount + routingFee;

	useEffect(() => {
		const eventSource = subscribeSSE<{ paymentRequest: string }>(
			`${import.meta.env.PUBLIC_API_URL}/api/payments/${claim.paymentRequest}`,
			({ paymentRequest: paymentRequestPaid }) => {
				if (paymentRequestPaid === claim.paymentRequest) {
					onSuccess();
				}
			},
		);

		return () => {
			eventSource.close();
		};
	}, [claim.paymentRequest, onSuccess]);

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
			<p className="mb-2 text-center font-bold text-2xl">Complete your payment</p>

			<p className="mb-4 text-center text-lg text-white-muted">
				Pay the lightning invoice to send {formatNumber(claim.receiverSatsAmount)} sats to{" "}
				{claim.receiver}.
			</p>

			<div className="mb-4 flex flex-col gap-2 rounded-lg border border-white-muted/50 bg-background p-2 text-sm">
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

			<div className="mb-2 flex items-center justify-between">
				<span className="font-bold">Lightning invoice</span>

				<Button variant="text" onClick={handleCopyToClipboard} disabled={copied}>
					{copied ? (
						<Check size={18} className="mt-0.5 mr-2" />
					) : (
						<Copy size={18} className="mt-0.5 mr-2" />
					)}
					<span className="font-bold text-sm">{copied ? "Copied!" : "Copy"}</span>
				</Button>
			</div>

			<div className="mb-4 flex justify-center">
				<Qrcode payload={`lightning:${claim.paymentRequest}`} />
			</div>

			<div className="mb-8 break-words rounded-lg border border-white-muted/50 bg-background p-2 text-sm text-white-muted">
				{claim.paymentRequest}
			</div>

			<div className="mb-4 grid grid-cols-3 gap-2">
				<div
					className="h-2 animate-pulse rounded-full bg-white"
					style={{ animationDelay: "0ms" }}
				/>
				<div
					className="h-2 animate-pulse rounded-full bg-white"
					style={{ animationDelay: "200ms" }}
				/>
				<div
					className="h-2 animate-pulse rounded-full bg-white"
					style={{ animationDelay: "400ms" }}
				/>
			</div>

			<p className="mb-4 text-center text-white-muted">Waiting for payment confirmation..</p>

			<Button className="w-full" variant="danger" onClick={onCancel}>
				Cancel claim
			</Button>
		</>
	);
};
