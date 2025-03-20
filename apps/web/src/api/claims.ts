import type { CreateClaimRequest, CreateClaimResponse, GetClaimsByIdsResponse } from "@repo/shared";
import { apiClient } from ".";

export const createClaim = async (data: CreateClaimRequest) =>
	(await apiClient.post<CreateClaimResponse>("/api/claims", data)).data;

export const getClaimsByIds = async (claimIds: string[]) =>
	(
		await apiClient.get<GetClaimsByIdsResponse>("/api/claims", {
			params: { claimIds },
		})
	).data;
