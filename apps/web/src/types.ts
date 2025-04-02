import type { inferOutput } from "@trpc/tanstack-react-query";
import type { trpc } from "./trpc";

export type Claim = inferOutput<typeof trpc.claims.getClaimsByIds>[0];
export type ClaimStatus = Claim["status"];
export type ClaimChannel = Claim["channel"];
