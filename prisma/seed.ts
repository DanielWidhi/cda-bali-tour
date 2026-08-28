import { PrismaClient } from "@prisma/client";
import { tours } from "../src/data/tours";
import { transportOptions } from "../src/data/transport";
import { testimonials } from "../src/data/testimonials";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding tour packages...");
  for (const tour of tours) {
    await prisma.tourPackage.upsert({
      where: { slug: tour.slug },
      update: {},
      create: {
        slug: tour.slug,
        title: tour.title,
        category: tour.category,
        categoryLabel: tour.categoryLabel,
        location: tour.location,
        duration: tour.duration,
        price: tour.price,
        originalPrice: tour.originalPrice,
        rating: tour.rating,
        reviewCount: tour.reviewCount,
        coverImage: tour.coverImage,
        gallery: tour.gallery,
        shortDescription: tour.shortDescription,
        description: tour.description,
        highlights: tour.highlights,
        itinerary: tour.itinerary,
        includes: tour.includes,
        excludes: tour.excludes,
        faq: tour.faq,
      },
    });
  }

  console.log("Seeding transport options...");
  for (const car of transportOptions) {
    await prisma.transport.upsert({
      where: { slug: car.slug },
      update: {},
      create: {
        slug: car.slug,
        name: car.name,
        capacity: car.capacity,
        pricePerDay: car.pricePerDay,
        hours: car.hours,
        image: car.image,
      },
    });
  }

  console.log("Seeding testimonials...");
  for (const t of testimonials) {
    await prisma.testimonial.create({
      data: {
        name: t.name,
        origin: t.origin,
        rating: t.rating,
        quote: t.quote,
        tourSlug: t.tourSlug,
      },
    });
  }

  console.log("Seed selesai ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
