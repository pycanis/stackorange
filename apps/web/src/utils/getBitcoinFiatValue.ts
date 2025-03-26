export const getBitcoinFiatValue = (satsAmount: number, exchangeRate: number) =>
	(satsAmount / 100_000_000) * exchangeRate;
