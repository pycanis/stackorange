import { ClaimChannel } from "@repo/database";
import { z } from "zod";

export const createClaimSchema = z.object({
	channel: z.nativeEnum(ClaimChannel),
	receiver: z.string(),
	message: z.string(),
	receiverSatsAmount: z.number(),
	platformSatsAmount: z.number().nullable(),
});
