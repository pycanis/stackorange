export const getBitcoinFiatValue = (satsAmount: number, exchangeRate: number) =>
	(satsAmount / 1_00_000_000) * exchangeRate;
