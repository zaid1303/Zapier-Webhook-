/*
  Warnings:

  - You are about to drop the column `metadata` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `Trigger` table. All the data in the column will be lost.
  - You are about to drop the `AvailableTrigger` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Trigger" DROP CONSTRAINT "Trigger_triggerId_fkey";

-- AlterTable
ALTER TABLE "Action" DROP COLUMN "metadata";

-- AlterTable
ALTER TABLE "Trigger" DROP COLUMN "metadata";

-- DropTable
DROP TABLE "AvailableTrigger";

-- CreateTable
CREATE TABLE "AvailableTriggers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "AvailableTriggers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_triggerId_fkey" FOREIGN KEY ("triggerId") REFERENCES "AvailableTriggers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
