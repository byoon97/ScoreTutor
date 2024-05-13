/*
  Warnings:

  - You are about to drop the column `picksByDayId` on the `Pick` table. All the data in the column will be lost.
  - You are about to drop the `PickByDays` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pick" DROP CONSTRAINT "Pick_picksByDayId_fkey";

-- DropIndex
DROP INDEX "Pick_picksByDayId_key";

-- AlterTable
ALTER TABLE "Pick" DROP COLUMN "picksByDayId";

-- DropTable
DROP TABLE "PickByDays";
