import { Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";
import { Qrcode } from "./Qrcode";
import { Button } from "./ui/Button";

type Props = {
	header: string;
	payload: string;
};
export const PaymentInfo = ({ header, payload }: Props) => {
	const { isCopied, handleCopyToClipboard } = useCopyToClipboard(payload);

	return (
		<>
			<div className="mb-2 flex items-center justify-between">
				<span className="font-bold">{header}</span>

				<Button variant="text" onClick={handleCopyToClipboard} disabled={isCopied}>
					{isCopied ? (
						<Check size={18} className="mt-0.5 mr-2" />
					) : (
						<Copy size={18} className="mt-0.5 mr-2" />
					)}
					<span className="font-bold text-sm">{isCopied ? "Copied!" : "Copy"}</span>
				</Button>
			</div>

			<div className="mb-4 flex justify-center">
				<Qrcode payload={`lightning:${payload}`} />
			</div>

			<div className="break-words rounded-lg border border-white-muted/50 bg-background p-2 text-sm text-white-muted">
				{payload}
			</div>
		</>
	);
};
