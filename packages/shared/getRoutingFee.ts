import { ROUTING_FEE_PERCENT } from "./constants";

export const getRoutingFee = (receiverSatsAmount: number) =>
	Math.ceil((receiverSatsAmount * ROUTING_FEE_PERCENT) / 100);
