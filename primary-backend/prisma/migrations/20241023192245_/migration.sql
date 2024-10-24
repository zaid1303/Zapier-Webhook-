/*
  Warnings:

  - The `metadata` column on the `Action` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `metadata` column on the `Trigger` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Action" DROP COLUMN "metadata",
ADD COLUMN     "metadata" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "Trigger" DROP COLUMN "metadata",
ADD COLUMN     "metadata" JSONB NOT NULL DEFAULT '{}';
