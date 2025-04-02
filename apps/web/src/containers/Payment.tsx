import { ROUTING_FEE_PERCENT, getRoutingFee } from "@repo/shared";
import { useSubscription } from "@trpc/tanstack-react-query";
import { PaymentInfo } from "../components/PaymentInfo";
import { PaymentWait } from "../components/PaymentWait";
import { Button } from "../components/ui/Button";
import { trpc } from "../trpc";
import type { Claim } from "../types";
import { formatNumber } from "../utils/numbers";

type Props = {
	claim: Claim;
	onSuccess: () => void;
	onCancel: () => void;
};

export const Payment = ({ claim, onSuccess, onCancel }: Props) => {
	useSubscription(
		trpc.payments.paymentUpdate.subscriptionOptions(claim.paymentRequest, {
			onData: (paymentRequest: string) => {
				if (paymentRequest === claim.paymentRequest) {
					onSuccess();
				}
			},
		}),
	);

	const routingFee = getRoutingFee(claim.receiverSatsAmount);
	const platformSatsAmount = claim.platformSatsAmount || 0;

	const total = claim.receiverSatsAmount + platformSatsAmount + routingFee;

	return (
		<>
			<p className="mb-2 text-center font-bold text-2xl">Complete your payment</p>

			<p className="mb-4 text-center text-lg text-white-muted">
				Pay the lightning invoice to send {formatNumber(claim.receiverSatsAmount)} sats to{" "}
				{claim.receiver}.
			</p>

			<div className="mb-4 flex flex-col gap-2 rounded-lg border border-white-muted/50 bg-background p-2 text-sm">
				{claim.sender && (
					<div className="flex justify-between">
						<span className="text-white-muted">Sender:</span>
						<span className="font-bold">{claim.sender}</span>
					</div>
				)}

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

			<div className="mb-4">
				<PaymentInfo header="Lightning invoice" payload={claim.paymentRequest} />
			</div>

			<PaymentWait text="Waiting for payment confirmation.." />

			<Button className="mt-4 w-full" variant="danger" onClick={onCancel}>
				Cancel claim
			</Button>
		</>
	);
};
