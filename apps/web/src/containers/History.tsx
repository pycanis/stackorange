import { type Claims, HISTORY_CLAIM_IDS_KEY } from "@repo/shared";
import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { getClaimsByIds } from "../api/claims";
import { getClaimLink } from "../utils/getClaimLink";
import { truncate } from "../utils/strings";

export const History = () => {
	const [paidClaimIds] = useLocalStorageState<string[]>(HISTORY_CLAIM_IDS_KEY);
	const [paidClaims, setPaidClaims] = useState<Claims[]>([]);

	useEffect(() => {
		if (!paidClaimIds || paidClaimIds.length === 0) {
			return;
		}

		getClaimsByIds(paidClaimIds).then((claims) => {
			setPaidClaims(claims);
		});
	}, [paidClaimIds]);

	if (paidClaims.length === 0) {
		return null;
	}

	return (
		<div className="mt-2">
			<details>
				<summary className="cursor-pointer border-b-1 border-b-white text-center">
					Show history
				</summary>

				<div className="w-full">
					{paidClaims.map((claim) => (
						<div key={claim.id} className="flex justify-between">
							<p className="flex-1">{claim.createdAt.toLocaleDateString()}</p>
							<p className="flex-2 text-center">{claim.receiver}</p>
							<p className="flex-1 text-center">{claim.receiverSatsAmount} sats</p>
							<p className="flex-1 text-center italic">
								"{truncate(claim.message || "<no message>")}"
							</p>
							<a
								href={getClaimLink(claim.id)}
								target="_blank"
								rel="noreferrer"
								className="flex-1 text-end text-orange hover:underline"
							>
								claim link
							</a>
						</div>
					))}
				</div>
			</details>
		</div>
	);
};
