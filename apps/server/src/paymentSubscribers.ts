import type { Response } from "express";

export const paymentSubscribers = new Map<string, Response[]>();
