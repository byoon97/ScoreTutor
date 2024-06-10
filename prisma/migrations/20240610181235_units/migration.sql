/*
  Warnings:

  - You are about to drop the column `date` on the `UnitCount` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `UnitCount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UnitCount" DROP COLUMN "date",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "DailyUnit" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "netUnits" DOUBLE PRECISION NOT NULL,
    "unitCountId" INTEGER NOT NULL,

    CONSTRAINT "DailyUnit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DailyUnit" ADD CONSTRAINT "DailyUnit_unitCountId_fkey" FOREIGN KEY ("unitCountId") REFERENCES "UnitCount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
