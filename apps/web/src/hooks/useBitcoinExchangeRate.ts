import { getBitcoinExchangeRate } from "@repo/shared";
import { useCallback, useMemo, useState } from "react";

export const useBitcoinExchangeRate = () => {
	const [usdExchangeRate, setUsdExchangeRate] = useState<number | null>(null);

	const fetchExchangeRate = useCallback(() => {
		getBitcoinExchangeRate().then((rate) => {
			setUsdExchangeRate(rate);
		});
	}, []);

	return useMemo(
		() => ({
			fetchExchangeRate,
			usdExchangeRate,
		}),
		[fetchExchangeRate, usdExchangeRate],
	);
};
