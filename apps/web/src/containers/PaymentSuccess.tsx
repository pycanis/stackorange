import type { Claims } from "@repo/shared";
import { Check, ExternalLink, History, Pill } from "lucide-react";
import { Button } from "../components/ui/Button";
import { getClaimLink } from "../utils/getClaimLink";
import { formatNumber } from "../utils/numbers";

type Props = {
	claim: Claims;
	onCancel: () => void;
};

export const PaymentSuccess = ({ claim, onCancel }: Props) => {
	return (
		<>
			<div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-200">
				<Check color="green" size={28} strokeWidth={3} />
			</div>

			<p className="mb-2 text-center font-bold text-2xl">Orange pill sucessfully sent!</p>

			<p className="mb-8 text-center text-lg text-white-muted">
				{claim.receiver} will receive instructions on how to claim their{" "}
				{formatNumber(claim.receiverSatsAmount)} sats.
			</p>

			<div className="mb-8 rounded-lg border border-white-muted/50 bg-background p-2">
				<p className="mb-2 font-bold">Claim link for unclaimed sats</p>

				<p className="mb-2 text-sm text-white-muted">
					If the sats aren't claimed within the timeframe you consider reasonable, you can reclaim
					them yourself.
				</p>

				<a
					href={getClaimLink(claim.id)}
					target="_blank"
					rel="noreferrer"
					className="flex items-center gap-2 text-orange hover:underline"
				>
					<span>Reclaim sats</span>
					<ExternalLink size={16} />
				</a>
			</div>

			<Button className="mt-2 w-full items-center gap-2" onClick={onCancel}>
				<Pill size={18} />
				<span>Send another orange pill</span>
			</Button>

			<Button
				className="mt-2 w-full items-center gap-2"
				variant="secondary"
				onClick={() => {
					window.location.href = "/history";
				}}
			>
				<History size={18} />
				<span>View orange pill history</span>
			</Button>
		</>
	);
};
