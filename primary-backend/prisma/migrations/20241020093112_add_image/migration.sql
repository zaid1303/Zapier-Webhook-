/*
  Warnings:

  - You are about to drop the `AvailableTriggers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Trigger" DROP CONSTRAINT "Trigger_triggerId_fkey";

-- AlterTable
ALTER TABLE "Action" ADD COLUMN     "metadata" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "AvailableAction" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Trigger" ADD COLUMN     "metadata" JSONB NOT NULL DEFAULT '{}';

-- DropTable
DROP TABLE "AvailableTriggers";

-- CreateTable
CREATE TABLE "AvailableTrigger" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "AvailableTrigger_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_triggerId_fkey" FOREIGN KEY ("triggerId") REFERENCES "AvailableTrigger"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
