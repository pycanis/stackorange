// Due to incompatibility between prisma and vite, we can't import prisma types and enums from @repo/database
// Should hopefully be fixed by May 2025
// Notifications set, will fix ASAP
// https://github.com/prisma/prisma/issues/26592

export enum ClaimChannel {
	EMAIL = "EMAIL",
	SMS = "SMS",
}

export enum ClaimStatus {
	AWAITING_PAYMENT = "AWAITING_PAYMENT",
	PAID = "PAID",
	CLAIMED = "CLAIMED",
}

export type Claims = {
	id: string;
	paymentRequest: string;
	receiverSatsAmount: number;
	platformSatsAmount: number | null;
	sender: string | null;
	receiver: string;
	message: string | null;
	status: ClaimStatus;
	channel: ClaimChannel;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
};
