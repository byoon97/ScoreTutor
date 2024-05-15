/*
  Warnings:

  - Added the required column `choice` to the `Pick` table without a default value. This is not possible if the table is not empty.
  - Added the required column `conclusion` to the `Pick` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preview` to the `Pick` table without a default value. This is not possible if the table is not empty.
  - Added the required column `result` to the `Pick` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit` to the `Pick` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pick" ADD COLUMN     "awayInj" TEXT[],
ADD COLUMN     "awayTeam" TEXT[],
ADD COLUMN     "choice" TEXT NOT NULL,
ADD COLUMN     "conclusion" TEXT NOT NULL,
ADD COLUMN     "h2h" TEXT[],
ADD COLUMN     "homeInj" TEXT[],
ADD COLUMN     "homeTeam" TEXT[],
ADD COLUMN     "preview" TEXT NOT NULL,
ADD COLUMN     "result" TEXT NOT NULL,
ADD COLUMN     "unit" INTEGER NOT NULL;
