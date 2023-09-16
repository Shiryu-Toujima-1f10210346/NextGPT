/*
  Warnings:

  - Added the required column `dislike` to the `Odai` table without a default value. This is not possible if the table is not empty.
  - Added the required column `like` to the `Odai` table without a default value. This is not possible if the table is not empty.
  - Added the required column `official` to the `Odai` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `Odai` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Odai" ADD COLUMN     "dislike" INTEGER NOT NULL,
ADD COLUMN     "like" INTEGER NOT NULL,
ADD COLUMN     "official" BOOLEAN NOT NULL,
ADD COLUMN     "score" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Result" (
    "id" SERIAL NOT NULL,
    "odaiId" TEXT NOT NULL,
    "result" JSONB NOT NULL,
    "score" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);
