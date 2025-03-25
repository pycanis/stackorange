import { PrismaClient } from "../generated/client";

export * from "../generated/client";
export const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });
