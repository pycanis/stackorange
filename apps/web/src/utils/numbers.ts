const numberFormatter = new Intl.NumberFormat(
	typeof navigator === "undefined" ? "en-US" : navigator.language,
	{
		style: "decimal",
	},
);

const currencyFormatter = new Intl.NumberFormat(
	typeof navigator === "undefined" ? "en-US" : navigator.language,
	{
		style: "currency",
		maximumFractionDigits: 2,
		currency: "usd",
	},
);

export const formatNumber = (number: number) => numberFormatter.format(number);
export const formatCurrency = (number: number) => currencyFormatter.format(number);
