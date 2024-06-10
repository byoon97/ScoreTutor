/*
  Warnings:

  - Made the column `net` on table `Pick` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Pick" ALTER COLUMN "net" SET NOT NULL,
ALTER COLUMN "net" SET DEFAULT 0.0;
