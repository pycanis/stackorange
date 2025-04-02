import type { ClaimChannel } from "./types";

export const LAST_ACTIVE_CLAIM_ID_KEY = "LAST_ACTIVE_CLAIM_ID_KEY";
export const HISTORY_CLAIM_IDS_KEY = "HISTORY_CLAIM_IDS_KEY";

export const API_URL = import.meta.env.PUBLIC_API_URL || "";

export const CLAIM_CHANNELS: ClaimChannel[] = ["EMAIL", "SMS"] as const;
