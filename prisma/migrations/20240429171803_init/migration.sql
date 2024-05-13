/*
  Warnings:

  - You are about to drop the column `userId` on the `Pick` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[picksByDayId]` on the table `Pick` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `picksByDayId` to the `Pick` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Pick` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pick" DROP CONSTRAINT "Pick_userId_fkey";

-- DropIndex
DROP INDEX "Pick_userId_key";

-- AlterTable
ALTER TABLE "Pick" DROP COLUMN "userId",
ADD COLUMN     "picksByDayId" INTEGER NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "unit" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "UnitCount" (
    "id" SERIAL NOT NULL,
    "netUnits" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UnitCount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PickByDays" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "units" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PickByDays_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pick_picksByDayId_key" ON "Pick"("picksByDayId");

-- AddForeignKey
ALTER TABLE "Pick" ADD CONSTRAINT "Pick_picksByDayId_fkey" FOREIGN KEY ("picksByDayId") REFERENCES "PickByDays"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
