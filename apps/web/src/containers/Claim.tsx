import { ClaimStatus, type Claims } from "@repo/shared";
import { bech32 } from "bech32";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { getClaimsByIds } from "../api/claims";
import { Qrcode } from "../components/Qrcode";
import { formatNumber } from "../utils/numbers";

export const Claim = () => {
	const id = queryString.parse(window.location.search).id as string | undefined;
	const [claim, setClaim] = useState<Claims | null>(null);

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
	}, [id]);

	if (!claim) {
		return null;
	}

	// todo: currency
	// todo: live update after payment
	// todo: already claimed or not paid yet statuses

	return (
		<>
			{claim.status === ClaimStatus.PAID && (
				<div className="flex flex-col items-center gap-2">
					<Qrcode payload={`lightning:${withdrawLinkLnurl}`} />

					<p className="text-sm">
						You can claim{" "}
						<span className="font-bold">{formatNumber(claim.receiverSatsAmount)} sats</span>{" "}
						currently valued at <span>{formatNumber(123)}</span>.
					</p>
				</div>
			)}
		</>
	);
};
