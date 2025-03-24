-- CreateTable
CREATE TABLE "Claims" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "paymentRequest" TEXT NOT NULL,
    "receiverSatsAmount" INTEGER NOT NULL,
    "platformSatsAmount" INTEGER,
    "sender" TEXT,
    "receiver" TEXT NOT NULL,
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'AWAITING_PAYMENT',
    "channel" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME
);

-- CreateIndex
CREATE UNIQUE INDEX "Claims_paymentRequest_key" ON "Claims"("paymentRequest");
