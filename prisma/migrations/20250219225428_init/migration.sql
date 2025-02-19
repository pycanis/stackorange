-- CreateTable
CREATE TABLE "Balances" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "satsAmount" INTEGER NOT NULL,
    "receiver" TEXT NOT NULL,
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "platform" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME
);
