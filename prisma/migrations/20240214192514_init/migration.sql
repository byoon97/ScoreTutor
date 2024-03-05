/*
  Warnings:

  - You are about to drop the column `premium` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[memberId]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `memberId` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "memberId" INTEGER NOT NULL,
ALTER COLUMN "expiresAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "premium";

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_memberId_key" ON "Subscription"("memberId");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
