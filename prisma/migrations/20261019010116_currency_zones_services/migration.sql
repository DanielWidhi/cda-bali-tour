-- AlterTable
ALTER TABLE "tour_packages" ADD COLUMN     "originalPriceUsd" INTEGER,
ADD COLUMN     "priceUsd" INTEGER;

-- AlterTable
ALTER TABLE "transport_options" ADD COLUMN     "description" JSONB,
ADD COLUMN     "gallery" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "luggage" JSONB,
ADD COLUMN     "pricePerDayUsd" INTEGER;

-- CreateTable
CREATE TABLE "transport_zones" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "description" JSONB NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transport_zones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transport_zone_prices" (
    "id" TEXT NOT NULL,
    "transportId" TEXT NOT NULL,
    "zoneId" TEXT NOT NULL,
    "priceIdr" INTEGER NOT NULL,
    "priceUsd" INTEGER,

    CONSTRAINT "transport_zone_prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" JSONB NOT NULL,
    "shortDescription" JSONB NOT NULL,
    "description" JSONB NOT NULL,
    "highlights" JSONB NOT NULL,
    "includes" JSONB NOT NULL,
    "excludes" JSONB NOT NULL,
    "faq" JSONB NOT NULL,
    "coverImage" TEXT,
    "gallery" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "linkHref" TEXT,
    "showTransportCta" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "transport_zones_number_key" ON "transport_zones"("number");

-- CreateIndex
CREATE UNIQUE INDEX "transport_zone_prices_transportId_zoneId_key" ON "transport_zone_prices"("transportId", "zoneId");

-- CreateIndex
CREATE UNIQUE INDEX "services_slug_key" ON "services"("slug");

-- AddForeignKey
ALTER TABLE "transport_zone_prices" ADD CONSTRAINT "transport_zone_prices_transportId_fkey" FOREIGN KEY ("transportId") REFERENCES "transport_options"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transport_zone_prices" ADD CONSTRAINT "transport_zone_prices_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "transport_zones"("id") ON DELETE CASCADE ON UPDATE CASCADE;
