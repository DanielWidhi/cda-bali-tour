import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const tours = [
  {
    slug: "sunrise-mount-batur-jeep",
    title: "Sunrise Mount Batur by Private 4WD Jeep",
    category: "sunrise",
    categoryLabel: "Sunrise Tour",
    location: "Kintamani, Bali",
    durationHours: 5,
    price: 550000,
    originalPrice: 650000,
    rating: 4.9,
    reviewCount: 214,
    coverImage: "https://picsum.photos/seed/batur-sunrise/1200/900",
    gallery: [
      "https://picsum.photos/seed/batur-sunrise/1200/900",
      "https://picsum.photos/seed/batur-jeep-1/1200/900",
    ],
    shortDescription: {
      id: "Kejar garis cahaya pertama di atas kaldera Batur dengan jeep 4WD pribadi, tanpa perlu mendaki.",
      en: "Chase the first light over Batur's caldera on a private 4WD jeep, no hiking required.",
    },
    description: {
      id: "Berangkat sebelum subuh dari penjemputan hotel, Anda akan diantar naik jeep 4WD pribadi menyusuri jalur off-road menuju titik pandang terbaik di lereng Gunung Batur. Nikmati matahari terbit di atas kaldera sambil ditemani kopi lokal, lalu lanjutkan perjalanan melintasi hamparan lava hitam sisa letusan 1917 dan 1926.",
      en: "Depart before dawn from your hotel and ride a private 4WD jeep along off-road trails to the best viewpoint on Mount Batur's slope. Enjoy sunrise over the caldera with local coffee, then continue across the black lava fields left from the 1917 and 1926 eruptions.",
    },
    highlights: [
      { id: "Penjemputan hotel area Kuta, Seminyak, Ubud, Sanur", en: "Hotel pickup in Kuta, Seminyak, Ubud, Sanur" },
      { id: "Jeep 4WD eksklusif — tidak digabung rombongan lain", en: "Exclusive 4WD jeep — never shared with other groups" },
      { id: "Sarapan ringan & kopi Kintamani di titik sunrise", en: "Light breakfast & Kintamani coffee at the sunrise point" },
      { id: "Melintasi black lava trail bekas letusan Gunung Batur", en: "Cross the black lava trail from Mount Batur's eruption" },
    ],
    itinerary: [
      { time: "03.30", activity: { id: "Penjemputan dari hotel", en: "Hotel pickup" } },
      { time: "05.00", activity: { id: "Tiba di pos awal, ganti ke jeep 4WD", en: "Arrive at base post, switch to 4WD jeep" } },
      { time: "05.30", activity: { id: "Menuju titik pandang sunrise terbaik", en: "Head to the best sunrise viewpoint" } },
      { time: "06.15", activity: { id: "Sunrise + sarapan ringan", en: "Sunrise + light breakfast" } },
      { time: "07.00", activity: { id: "Jelajah black lava trail", en: "Explore the black lava trail" } },
      { time: "08.30", activity: { id: "Kembali & antar ke hotel", en: "Return & drop-off at hotel" } },
    ],
    includes: [
      { id: "Jeep 4WD pribadi + driver berpengalaman", en: "Private 4WD jeep + experienced driver" },
      { id: "Penjemputan & antar hotel", en: "Hotel pickup & drop-off" },
      { id: "Sarapan ringan dan kopi", en: "Light breakfast and coffee" },
      { id: "Asuransi perjalanan", en: "Travel insurance" },
    ],
    excludes: [
      { id: "Tiket masuk area jika ada", en: "Entrance ticket if applicable" },
      { id: "Pengeluaran pribadi", en: "Personal expenses" },
      { id: "Tip driver", en: "Driver tip" },
    ],
    faq: [
      {
        question: { id: "Apakah perlu mendaki gunung?", en: "Do I need to hike the mountain?" },
        answer: {
          id: "Tidak. Jeep akan membawa Anda langsung ke titik pandang, tanpa perlu trekking atau mendaki.",
          en: "No. The jeep takes you directly to the viewpoint, no trekking or hiking needed.",
        },
      },
      {
        question: { id: "Jam berapa penjemputan?", en: "What time is pickup?" },
        answer: {
          id: "Sekitar pukul 03.00–03.30 tergantung lokasi hotel, agar tiba tepat waktu sebelum matahari terbit.",
          en: "Around 03:00–03:30 depending on your hotel location, to arrive on time before sunrise.",
        },
      },
    ],
  },
  {
    slug: "nusa-penida-west-full-day",
    title: "Nusa Penida West Full Day Trip",
    category: "nusa-penida",
    categoryLabel: "Nusa Penida",
    location: "Nusa Penida",
    durationHours: 10,
    price: 750000,
    rating: 4.8,
    reviewCount: 356,
    coverImage: "https://picsum.photos/seed/nusa-penida/1200/900",
    gallery: ["https://picsum.photos/seed/nusa-penida/1200/900"],
    shortDescription: {
      id: "Kelingking Beach, Angel's Billabong, Broken Beach, dan Crystal Bay dalam satu hari.",
      en: "Kelingking Beach, Angel's Billabong, Broken Beach, and Crystal Bay in one day.",
    },
    description: {
      id: "Menyeberang dengan fast boat pagi hari dari Sanur menuju Nusa Penida, dilanjutkan tur mengelilingi sisi barat pulau: tebing ikonik Kelingking, kolam alami Angel's Billabong, formasi batu Broken Beach, hingga snorkeling santai di Crystal Bay.",
      en: "Cross by fast boat in the morning from Sanur to Nusa Penida, then tour the island's west side: the iconic Kelingking cliff, the natural pool of Angel's Billabong, the Broken Beach rock formation, and relaxed snorkeling at Crystal Bay.",
    },
    highlights: [
      { id: "Fast boat PP Sanur–Nusa Penida", en: "Round-trip fast boat Sanur–Nusa Penida" },
      { id: "Spot foto ikonik Kelingking Beach", en: "Iconic photo spot at Kelingking Beach" },
      { id: "Snorkeling di Crystal Bay", en: "Snorkeling at Crystal Bay" },
      { id: "Private car selama di Nusa Penida", en: "Private car while on Nusa Penida" },
    ],
    itinerary: [
      { time: "06.30", activity: { id: "Penjemputan & menuju pelabuhan Sanur", en: "Pickup & transfer to Sanur harbor" } },
      { time: "07.30", activity: { id: "Fast boat ke Nusa Penida", en: "Fast boat to Nusa Penida" } },
      { time: "09.00", activity: { id: "Kelingking Beach", en: "Kelingking Beach" } },
      { time: "11.00", activity: { id: "Angel's Billabong & Broken Beach", en: "Angel's Billabong & Broken Beach" } },
      { time: "13.00", activity: { id: "Makan siang", en: "Lunch" } },
      { time: "14.30", activity: { id: "Snorkeling Crystal Bay", en: "Snorkeling at Crystal Bay" } },
      { time: "16.30", activity: { id: "Fast boat kembali ke Sanur", en: "Fast boat back to Sanur" } },
    ],
    includes: [
      { id: "Fast boat PP", en: "Round-trip fast boat" },
      { id: "Private car + driver di Nusa Penida", en: "Private car + driver on Nusa Penida" },
      { id: "Alat snorkeling", en: "Snorkeling gear" },
      { id: "Makan siang", en: "Lunch" },
    ],
    excludes: [
      { id: "Tiket masuk objek wisata", en: "Attraction entrance tickets" },
      { id: "Sewa GoPro/kamera", en: "GoPro/camera rental" },
    ],
    faq: [
      {
        question: { id: "Apakah harus bisa berenang untuk snorkeling?", en: "Do I need to know how to swim to snorkel?" },
        answer: {
          id: "Tidak wajib, life jacket disediakan dan pemandu akan selalu mendampingi.",
          en: "Not required — life jackets are provided and a guide is always with you.",
        },
      },
    ],
  },
];

const transportOptions = [
  { slug: "avanza-xenia", name: "Toyota Avanza / Xenia", capacityMin: 4, capacityMax: 5, pricePerDay: 500000, hours: 10, image: "https://picsum.photos/seed/avanza/800/600" },
  { slug: "suzuki-apv", name: "Suzuki APV", capacityMin: 5, capacityMax: 6, pricePerDay: 550000, hours: 10, image: "https://picsum.photos/seed/apv/800/600" },
  { slug: "isuzu-elf", name: "Isuzu ELF Short", capacityMin: 10, capacityMax: 12, pricePerDay: 1000000, hours: 10, image: "https://picsum.photos/seed/elf/800/600" },
  { slug: "toyota-hiace", name: "Toyota Hiace", capacityMin: 12, capacityMax: 14, pricePerDay: 1300000, hours: 10, image: "https://picsum.photos/seed/hiace/800/600" },
];

const testimonials = [
  { name: "Sarah Mitchell", origin: "Australia", rating: 5, quote: "Sunrise di Batur ini pengalaman terbaik selama di Bali. Driver kami sangat ramah dan tahu titik foto terbaik.", tourSlug: "sunrise-mount-batur-jeep", phone: "+61400000001" },
  { name: "Kenji Watanabe", origin: "Japan", rating: 5, quote: "Nusa Penida sesuai ekspektasi bahkan lebih. Semua terorganisir rapi dari penjemputan sampai kembali ke hotel.", tourSlug: "nusa-penida-west-full-day", phone: null },
  { name: "Lukas Bergmann", origin: "Germany", rating: 5, quote: "Harga transparan, tidak ada biaya tersembunyi sama sekali. Pasti pakai jasa CDA lagi kalau balik ke Bali.", tourSlug: null, phone: "+4915100000002" },
];

async function main() {
  console.log("Seeding tour packages...");
  for (const t of tours) {
    await prisma.tourPackage.upsert({ where: { slug: t.slug }, update: {}, create: t });
  }

  console.log("Seeding transport options...");
  for (const t of transportOptions) {
    await prisma.transport.upsert({ where: { slug: t.slug }, update: {}, create: t });
  }

  console.log("Seeding testimonials...");
  for (const t of testimonials) {
    await prisma.testimonial.create({ data: { ...t, published: true } });
  }

  console.log("Seeding gallery images...");
  for (const t of tours) {
    for (const url of t.gallery) {
      await prisma.galleryImage.create({ data: { url, caption: t.title } });
    }
  }

  console.log("Seed selesai ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
