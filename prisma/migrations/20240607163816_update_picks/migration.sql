-- AlterTable
ALTER TABLE "Pick" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN     "toWin" DOUBLE PRECISION NOT NULL DEFAULT 0.0;
