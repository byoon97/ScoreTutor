/*
  Warnings:

  - Added the required column `membership` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "membership" INTEGER NOT NULL,
ADD COLUMN     "premium" BOOLEAN NOT NULL DEFAULT false;
