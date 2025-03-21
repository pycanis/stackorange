import type { TypeOf } from "zod";
import type { createClaimSchema } from "./validators";

export type CreateClaimRequest = TypeOf<typeof createClaimSchema>;
