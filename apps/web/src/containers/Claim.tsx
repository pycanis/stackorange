import { ClaimStatus } from "@repo/shared";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { bech32 } from "bech32";
import { Layers } from "lucide-react";
import queryString from "query-string";
import { useEffect, useMemo } from "react";
import { getClaimsByIds } from "../api/claims";
import { PaymentInfo } from "../components/PaymentInfo";
import { PaymentWait } from "../components/PaymentWait";
import { getBitcoinFiatValue } from "../utils/getBitcoinFiatValue";
import { formatCurrency, formatNumber } from "../utils/numbers";
import { QUERY_KEYS } from "../utils/queryKeys";
import { subscribeSSE } from "../utils/sse";
import { useBitcoinExchangeRate } from "../utils/useBitcoinExchangeRate";
import { SuccessIcon } from "./SuccessIcon";
import { WaitIcon } from "./WaitIcon";

const queryClient = new QueryClient();

export const Claim = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<ClaimComponent />
		</QueryClientProvider>
	);
};

export const ClaimComponent = () => {
	const id = queryString.parse(window.location.search).id as string | undefined;
	const { usdExchangeRate, fetchExchangeRate } = useBitcoinExchangeRate();

	const { data: claims = [], refetch } = useQuery({
		queryKey: [QUERY_KEYS.GET_CLAIMS, [id]],
		queryFn: () => getClaimsByIds([id as string]),
		enabled: !!id,
		refetchOnWindowFocus: true,
	});

	const claim = useMemo(() => claims[0], [claims]);

	const withdrawLink = `https://stackorange.com/api/payments/withdraw/${id}`;

	const withdrawLinkLnurl = bech32
		.encode("lnurl", bech32.toWords(Buffer.from(withdrawLink, "utf8")), 1023)
		.toUpperCase();

	useEffect(() => {
		if (!claim || claim.status !== ClaimStatus.PAID) {
			return;
		}

		fetchExchangeRate();

		const eventSource = subscribeSSE<{ paymentId: string }>(
			`${import.meta.env.PUBLIC_API_URL || ""}/api/payments/${claim.id}`,
			({ paymentId }) => {
				if (paymentId === claim.id) {
					refetch();
				}
			},
		);

		return () => {
			eventSource.close();
		};
	}, [claim, fetchExchangeRate, refetch]);

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

					<PaymentInfo header="Withdraw request" payload={withdrawLinkLnurl} />

					<p className="my-4 text-center text-sm">
						You can claim{" "}
						<span className="font-bold">{formatNumber(claim.receiverSatsAmount)} sats</span>.{" "}
						{usdExchangeRate && (
							<>
								Currently valued at{" "}
								<span className="font-bold">
									{formatCurrency(getBitcoinFiatValue(claim.receiverSatsAmount, usdExchangeRate))}
								</span>
								.
							</>
						)}
					</p>

					<PaymentWait text="Waiting to be claimed.." />
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
