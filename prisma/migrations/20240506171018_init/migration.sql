/*
  Warnings:

  - You are about to drop the column `awayInj` on the `Pick` table. All the data in the column will be lost.
  - You are about to drop the column `choice` on the `Pick` table. All the data in the column will be lost.
  - You are about to drop the column `conclusion` on the `Pick` table. All the data in the column will be lost.
  - You are about to drop the column `h2h` on the `Pick` table. All the data in the column will be lost.
  - You are about to drop the column `homeInj` on the `Pick` table. All the data in the column will be lost.
  - You are about to drop the column `preview` on the `Pick` table. All the data in the column will be lost.
  - Added the required column `awayTeamLogo` to the `Pick` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homeTeamLogo` to the `Pick` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pick` to the `Pick` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pick" DROP COLUMN "awayInj",
DROP COLUMN "choice",
DROP COLUMN "conclusion",
DROP COLUMN "h2h",
DROP COLUMN "homeInj",
DROP COLUMN "preview",
ADD COLUMN     "awayTeamLogo" TEXT NOT NULL,
ADD COLUMN     "homeTeamLogo" TEXT NOT NULL,
ADD COLUMN     "pick" TEXT NOT NULL,
ALTER COLUMN "awayTeam" SET NOT NULL,
ALTER COLUMN "awayTeam" SET DATA TYPE TEXT,
ALTER COLUMN "homeTeam" SET NOT NULL,
ALTER COLUMN "homeTeam" SET DATA TYPE TEXT;
