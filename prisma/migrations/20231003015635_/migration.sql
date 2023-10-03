-- AlterTable
ALTER TABLE "Odai" ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'unknown',
ALTER COLUMN "official" SET DEFAULT false;
