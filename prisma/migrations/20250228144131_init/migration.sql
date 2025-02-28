-- CreateTable
CREATE TABLE "Balances" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "receiverSatsAmount" INTEGER NOT NULL,
    "donationSatsAmount" INTEGER,
    "receiver" TEXT NOT NULL,
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'AWAITING_PAYMENT',
    "platform" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME
);
