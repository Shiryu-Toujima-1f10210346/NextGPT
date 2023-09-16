-- AlterTable
ALTER TABLE "Result" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "name" SET DEFAULT 'unknown';
