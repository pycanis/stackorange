import axios from "axios";

export const getBitcoinExchangeRate = async (): Promise<number | null> => {
	try {
		const { data } = await axios.get(
			"https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
		);

		return data.bitcoin.usd;
	} catch (err) {
		console.error(err);

		return null;
	}
};
