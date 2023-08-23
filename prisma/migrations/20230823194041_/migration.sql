-- CreateTable
CREATE TABLE "Odai" (
    "id" SERIAL NOT NULL,
    "ng" TEXT[],
    "odai" TEXT NOT NULL,
    "limit" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Odai_pkey" PRIMARY KEY ("id")
);
