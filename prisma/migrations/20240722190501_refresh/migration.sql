-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ImageURL" TEXT NOT NULL,
    "League" TEXT NOT NULL,
    "Title" TEXT NOT NULL,
    "Synopsis" TEXT NOT NULL,
    "Body" TEXT NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);
