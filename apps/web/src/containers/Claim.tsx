import { ClaimStatus, type Claims, getBitcoinExchangeRate } from "@repo/shared";
import { bech32 } from "bech32";
import { Layers } from "lucide-react";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { getClaimsByIds } from "../api/claims";
import { PaymentWait } from "../components/PaymentWait";
import { Qrcode } from "../components/Qrcode";
import { formatCurrency, formatNumber } from "../utils/numbers";
import { subscribeSSE } from "../utils/sse";
import { SuccessIcon } from "./SuccessIcon";
import { WaitIcon } from "./WaitIcon";

export const Claim = () => {
	const id = queryString.parse(window.location.search).id as string | undefined;
	const [claim, setClaim] = useState<Claims | null>(null);
	const [usdExchangeRate, setUsdExchangeRate] = useState<number | null>(null);

	const withdrawLink = `https://stackorange.com/api/payments/withdraw/${id}`;
	const withdrawLinkLnurl = bech32
		.encode("lnurl", bech32.toWords(Buffer.from(withdrawLink, "utf8")), 1023)
		.toUpperCase();

	useEffect(() => {
		if (!id) {
			return;
		}

		getClaimsByIds([id]).then((claims) => {
			setClaim(claims[0]);
		});
	}, [id]);

	useEffect(() => {
		if (!claim || claim.status !== ClaimStatus.PAID) {
			return;
		}

		getBitcoinExchangeRate().then((rate) => {
			setUsdExchangeRate(rate);
		});

		const eventSource = subscribeSSE<{ paymentId: string }>(
			`${import.meta.env.PUBLIC_API_URL || ""}/api/payments/${claim.id}`,
			({ paymentId }) => {
				if (paymentId === claim.id) {
					setClaim((prev) => (prev ? { ...prev, status: ClaimStatus.CLAIMED } : null));
				}
			},
		);

		return () => {
			eventSource.close();
		};
	}, [claim]);

	if (!claim) {
		return null;
	}

	return (
		<>
			{claim.status === ClaimStatus.PAID && (
				<>
					<div className="mb-4">
						<div className="flex items-center">
							<Layers className="mr-2 text-orange" />
							<p className="font-bold text-2xl">Claim your sats</p>
						</div>

						<p className="text-white-muted">Scan this QR code with your Lightning wallet</p>
					</div>

					<div className="flex flex-col items-center">
						<Qrcode payload={`lightning:${withdrawLinkLnurl}`} />

						<p className="my-4 text-sm">
							You can claim{" "}
							<span className="font-bold">{formatNumber(claim.receiverSatsAmount)} sats</span>.{" "}
							{usdExchangeRate && (
								<>
									Currently valued at{" "}
									<span className="font-bold">
										{formatCurrency((claim.receiverSatsAmount / 1_000_000_000) * usdExchangeRate)}
									</span>
									.
								</>
							)}
						</p>

						<PaymentWait text="Waiting to be claimed.." />
					</div>
				</>
			)}

			{claim.status === ClaimStatus.CLAIMED && (
				<div>
					<SuccessIcon />

					<p className="mb-2 text-center font-bold text-2xl">Sats claimed successfully!</p>

					<p className="text-center text-lg text-white-muted">
						All {formatNumber(claim.receiverSatsAmount)} sats were claimed.
					</p>
				</div>
			)}

			{claim.status === ClaimStatus.AWAITING_PAYMENT && (
				<div>
					<WaitIcon />

					<p className="mb-2 text-center font-bold text-2xl">Awaiting payment..</p>

					<p className="text-center text-lg text-white-muted">
						This claim hasn't been paid for yet.
					</p>
				</div>
			)}
		</>
	);
};
