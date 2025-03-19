import { TypeOf } from "zod";
import { createClaimSchema } from "./validators";

export type CreateClaimRequest = TypeOf<typeof createClaimSchema>