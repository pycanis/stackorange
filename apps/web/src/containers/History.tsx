import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { Button } from "../components/ui/Button";
import { Link } from "../components/ui/Link";
import { HISTORY_CLAIM_IDS_KEY } from "../constants";
import { queryClient, trpc } from "../trpc";
import type { Claim, ClaimStatus } from "../types";
import { getTimeAgo } from "../utils/dates";
import { formatNumber } from "../utils/numbers";

type Filter = "ALL" | ClaimStatus;

const STATUS_COLOR_MAP: Record<ClaimStatus, string> = {
	AWAITING_PAYMENT: "text-red-500",
	PAID: "text-orange",
	CLAIMED: "text-green-500",
};

const STATUS_LABEL_MAP: Record<ClaimStatus, string> = {
	AWAITING_PAYMENT: "Not paid",
	PAID: "Pending",
	CLAIMED: "Claimed",
};

export const History = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<HistoryComponent />
		</QueryClientProvider>
	);
};

const HistoryComponent = () => {
	const [filter, setFilter] = useState<Filter>("ALL");
	const [claimIds] = useLocalStorageState<string[]>(HISTORY_CLAIM_IDS_KEY);

	const { data: claims = [] } = useQuery(
		trpc.claims.getClaimsByIds.queryOptions(claimIds as string[], {
			enabled: !!claimIds && claimIds.length > 0,
			refetchOnWindowFocus: true,
		}),
	);

	const groupedClaims = useMemo(
		() =>
			claims.reduce(
				(prev, curr) => {
					prev[curr.status].push(curr);

					return prev;
				},
				{ AWAITING_PAYMENT: [], CLAIMED: [], PAID: [] } as Record<ClaimStatus, Claim[]>,
			),
		[claims],
	);

	const claimsToRender = useMemo(
		() => groupedClaims[filter as ClaimStatus] || claims,
		[claims, filter, groupedClaims],
	);

	return (
		<motion.div
			initial={{ opacity: 0, y: 100 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.5, duration: 1 }}
		>
			<div className="rounded-lg border border-white-muted/50 bg-white-muted/10 px-2 py-4">
				<div className="mb-8 flex w-full rounded-lg bg-white-muted/50 p-1">
					<Button
						type="button"
						onClick={() => setFilter("ALL")}
						className={"flex-1".concat(
							" ",
							filter === "ALL" ? "bg-background font-bold" : "text-white/70",
						)}
						variant="group"
						disabled={claims.length === 0}
					>
						All
					</Button>

					<Button
						type="button"
						onClick={() => setFilter("AWAITING_PAYMENT")}
						className={"flex-1".concat(
							" ",
							filter === "AWAITING_PAYMENT" ? "bg-background font-bold" : "text-white/70",
						)}
						variant="group"
						disabled={groupedClaims.AWAITING_PAYMENT.length === 0}
					>
						Not paid
					</Button>

					<Button
						type="button"
						onClick={() => setFilter("PAID")}
						className={"flex-1".concat(
							" ",
							filter === "PAID" ? "bg-background font-bold" : "text-white/70",
						)}
						variant="group"
						disabled={groupedClaims.PAID.length === 0}
					>
						Pending
					</Button>

					<Button
						type="button"
						onClick={() => setFilter("CLAIMED")}
						className={"flex-1".concat(
							" ",
							filter === "CLAIMED" ? "bg-background font-bold" : "text-white/70",
						)}
						variant="group"
						disabled={groupedClaims.CLAIMED.length === 0}
					>
						Claimed
					</Button>
				</div>

				<div className="flex flex-col gap-2">
					{claimsToRender.length === 0 && (
						<div className="text-center">
							<span>No orange pills sent yet?</span> <Link href="/">Fix it right away!</Link>
						</div>
					)}

					{claimsToRender.map((claim) => (
						<a
							key={claim.id}
							href={`/claim?id=${claim.id}`}
							target="_blank"
							rel="noreferrer"
							className="flex items-center justify-between rounded-lg border border-white-muted/50 bg-background px-2 py-4 transition-all duration-100 hover:bg-background/10"
						>
							<div className="flex flex-col">
								<span className="font-bold text-lg">{claim.receiver}</span>

								<div>
									<span className="text-white-muted">{getTimeAgo(claim.createdAt)} • </span>{" "}
									<span className={STATUS_COLOR_MAP[claim.status]}>
										{STATUS_LABEL_MAP[claim.status]}
									</span>
								</div>
							</div>

							<div className="flex flex-col items-end">
								<span className="font-bold text-lg">
									{formatNumber(claim.receiverSatsAmount)} sats
								</span>

								{claim.platformSatsAmount && claim.platformSatsAmount > 0 && (
									<span className="text-sm">
										{formatNumber(claim.platformSatsAmount)} sats donation
									</span>
								)}
							</div>
						</a>
					))}
				</div>
			</div>
		</motion.div>
	);
};
