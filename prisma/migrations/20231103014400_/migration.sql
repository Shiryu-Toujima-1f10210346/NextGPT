/*
  Warnings:

  - Added the required column `count` to the `Result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `odai` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Result" ADD COLUMN     "count" INTEGER NOT NULL,
ADD COLUMN     "ng" TEXT[],
ADD COLUMN     "odai" TEXT NOT NULL;
