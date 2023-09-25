/*
  Warnings:

  - Made the column `name` on table `Result` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Result" ALTER COLUMN "name" SET NOT NULL;
