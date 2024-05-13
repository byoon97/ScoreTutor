/*
  Warnings:

  - Made the column `bankroll` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `unitSize` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "bankroll" SET NOT NULL,
ALTER COLUMN "unitSize" SET NOT NULL;
