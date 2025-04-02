import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useSubscription } from "@trpc/tanstack-react-query";
import { bech32 } from "bech32";
import { Layers } from "lucide-react";
import queryString from "query-string";
import { useMemo } from "react";
import { PaymentInfo } from "../components/PaymentInfo";
import { PaymentWait } from "../components/PaymentWait";
import { useBitcoinExchangeRate } from "../hooks/useBitcoinExchangeRate";
import { queryClient, trpc } from "../trpc";
import { getBitcoinFiatValue } from "../utils/getBitcoinFiatValue";
import { formatCurrency, formatNumber } from "../utils/numbers";
import { SuccessIcon } from "./SuccessIcon";
import { WaitIcon } from "./WaitIcon";

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

	const { data: claims = [], refetch } = useQuery(
		trpc.claims.getClaimsByIds.queryOptions([id as string], {
			enabled: !!id,
			refetchOnWindowFocus: true,
		}),
	);

	const claim = useMemo(() => claims[0], [claims]);

	useSubscription(
		trpc.payments.paymentUpdate.subscriptionOptions(claim?.paymentRequest, {
			enabled: claim && claim.status !== "CLAIMED",
			onStarted: () => {
				fetchExchangeRate();
			},
			onData: (paymentRequest: string) => {
				if (paymentRequest === claim.paymentRequest) {
					refetch();
				}
			},
		}),
	);

	const withdrawLink = `https://stackorange.com/api/withdraw/${id}`;

	const withdrawLinkLnurl = bech32
		.encode("lnurl", bech32.toWords(Buffer.from(withdrawLink, "utf8")), 1023)
		.toUpperCase();

	if (!claim) {
		return null;
	}

	return (
		<>
			{claim.status === "PAID" && (
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

			{claim.status === "CLAIMED" && (
				<div>
					<SuccessIcon />

					<p className="mb-2 text-center font-bold text-2xl">Sats claimed successfully!</p>

					<p className="text-center text-lg text-white-muted">
						All {formatNumber(claim.receiverSatsAmount)} sats were claimed.
					</p>
				</div>
			)}

			{claim.status === "AWAITING_PAYMENT" && (
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
