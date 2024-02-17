/*
  Warnings:

  - You are about to drop the column `memberId` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `membership` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_memberId_fkey";

-- DropIndex
DROP INDEX "Subscription_memberId_key";

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "memberId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "membership";

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_key" ON "Subscription"("userId");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
