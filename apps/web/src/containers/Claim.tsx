import { ClaimStatus, type Claims, getBitcoinExchangeRate } from "@repo/shared";
import { bech32 } from "bech32";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { getClaimsByIds } from "../api/claims";
import { PaymentWait } from "../components/PaymentWait";
import { Qrcode } from "../components/Qrcode";
import { formatCurrency, formatNumber } from "../utils/numbers";
import { subscribeSSE } from "../utils/sse";

export const Claim = () => {
	const id = queryString.parse(window.location.search).id as string | undefined;
	const [claim, setClaim] = useState<Claims | null>(null);
	const [usdExchangeRate, setUsdExchangeRate] = useState<number | null>(null);

	const withdrawLink = `https://stackorange.com/payments/withdraw/${id}`;
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

		getBitcoinExchangeRate().then((rate) => {
			setUsdExchangeRate(rate);
		});
	}, [id]);

	useEffect(() => {
		if (!claim || claim.status !== ClaimStatus.PAID) {
			return;
		}

		const eventSource = subscribeSSE<{ paymentId: string }>(
			`${import.meta.env.PUBLIC_API_URL}/api/payments/${claim.id}`,
			({ paymentId }) => {
				if (paymentId === claim.id) {
					// todo
					alert("CLAIMED!");
					// onSuccess();
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

	// todo: already claimed or not paid yet statuses

	return (
		<>
			{claim.status === ClaimStatus.PAID && (
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
			)}
		</>
	);
};
