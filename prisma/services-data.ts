import type { PrismaClient } from "@prisma/client";

// Teks awal (starter copy) — silakan diedit lewat Admin > Services. Seed ini TIDAK menimpa
// layanan yang slug-nya sudah ada (update: {}), jadi aman dijalankan berulang kali.
const lt = (id: string, en: string) => ({ id, en });
const faq = (qId: string, qEn: string, aId: string, aEn: string) => ({
  question: lt(qId, qEn),
  answer: lt(aId, aEn),
});

const common = {
  includes: [
    lt("Driver berpengalaman", "Experienced driver"),
    lt("Kendaraan ber-AC yang bersih dan nyaman", "Clean, comfortable air-conditioned vehicle"),
    lt("BBM & pajak", "Fuel & taxes"),
  ],
  excludes: [
    lt("Tiket masuk objek wisata", "Attraction entrance tickets"),
    lt("Biaya parkir", "Parking fees"),
    lt("Makan & minum", "Food & drinks"),
  ],
};

const zoneFaq = faq(
  "Bagaimana harga ditentukan?",
  "How is the price determined?",
  "Harga acuan mengikuti zona tujuan (Zona 1–4) dan jenis kendaraan. Untuk rute di antara beberapa zona atau rute custom, harga disesuaikan oleh tim kami lewat WhatsApp.",
  "The reference price follows the destination zone (Zone 1–4) and vehicle type. For routes across several zones or custom routes, our team will adjust the price via WhatsApp."
);

export const servicesData = [
  {
    slug: "rent-car",
    sortOrder: 1,
    showTransportCta: true,
    title: lt("Rent Car", "Rent Car"),
    shortDescription: lt(
      "Sewa mobil dengan driver untuk menjelajah Bali sesuai itinerary kamu sendiri.",
      "Rent a car with a driver and explore Bali on your own itinerary."
    ),
    description: lt(
      "Susun rute sendiri dan jelajahi Bali dengan nyaman. Kami menyediakan kendaraan yang terawat beserta driver berpengalaman, cocok untuk keluarga, rombongan, atau siapa pun yang ingin perjalanan fleksibel tanpa terikat paket tur.",
      "Plan your own route and explore Bali in comfort. We provide well-maintained vehicles with experienced drivers, ideal for families, groups, or anyone who wants a flexible trip without being tied to a fixed tour package."
    ),
    highlights: [
      lt("Rute fleksibel & privat — tanpa digabung dengan wisatawan lain", "Flexible, private routes — never shared with other travelers"),
      lt("Pilihan armada sesuai jumlah penumpang", "Vehicle options to match your group size"),
      lt("Harga transparan, tanpa biaya tersembunyi", "Transparent pricing, no hidden fees"),
      lt("Booking tanpa DP", "Booking without deposit"),
    ],
    ...common,
    faq: [
      faq(
        "Apakah harga sudah termasuk driver dan BBM?",
        "Does the price include the driver and fuel?",
        "Ya, harga sudah termasuk driver, BBM, dan pajak. Tiket masuk, parkir, serta makan tidak termasuk.",
        "Yes, the price includes the driver, fuel, and taxes. Entrance tickets, parking, and meals are not included."
      ),
    ],
  },
  {
    slug: "airport-transfer",
    sortOrder: 2,
    showTransportCta: true,
    title: lt("Airport Transfer", "Airport Transfer"),
    shortDescription: lt(
      "Penjemputan dan pengantaran bandara ke hotel atau villa dengan harga acuan per zona.",
      "Airport pickup and drop-off to your hotel or villa with zone-based reference prices."
    ),
    description: lt(
      "Mulai dan akhiri liburan tanpa repot. Driver kami menjemput di bandara dan mengantar langsung ke hotel atau villa kamu, atau sebaliknya. Lihat harga acuan per zona di halaman Transport untuk mengetahui kisaran biaya ke area lain.",
      "Start and end your holiday without hassle. Our driver picks you up at the airport and takes you straight to your hotel or villa, or the other way around. See the zone reference prices on the Transport page to know the price range to other areas."
    ),
    highlights: [
      lt("Penjemputan di bandara & antar ke hotel/villa", "Airport pickup & drop-off to your hotel/villa"),
      lt("Harga acuan jelas per zona", "Clear reference prices per zone"),
      lt("Kendaraan bersih & driver berpengalaman", "Clean vehicle & experienced driver"),
    ],
    ...common,
    faq: [zoneFaq],
  },
  {
    slug: "hotel-transfer",
    sortOrder: 3,
    showTransportCta: true,
    title: lt("Hotel Transfer", "Hotel Transfer"),
    shortDescription: lt(
      "Transfer antar hotel, villa, atau destinasi di Bali dengan harga acuan per zona.",
      "Transfers between hotels, villas, or destinations in Bali with zone-based reference prices."
    ),
    description: lt(
      "Pindah hotel atau villa, atau butuh antar-jemput ke destinasi tertentu? Kami antar dengan nyaman. Harga acuan mengikuti zona, dan untuk rute custom kami sesuaikan lewat WhatsApp.",
      "Moving between hotels or villas, or need a ride to a specific destination? We'll take you there comfortably. Reference prices follow the zones, and for custom routes we adjust the price via WhatsApp."
    ),
    highlights: [
      lt("Antar-jemput antar hotel, villa, dan destinasi", "Rides between hotels, villas, and destinations"),
      lt("Harga acuan jelas per zona", "Clear reference prices per zone"),
      lt("Rute custom bisa didiskusikan", "Custom routes can be discussed"),
    ],
    ...common,
    faq: [zoneFaq],
  },
  {
    slug: "day-trip",
    sortOrder: 4,
    linkHref: "/tour?category=day-tour",
    title: lt("Day Trip", "Day Trip"),
    shortDescription: lt(
      "Perjalanan sehari penuh (full day) atau setengah hari (half day) ke destinasi favorit di Bali.",
      "Full-day or half-day trips to Bali's favorite destinations."
    ),
    description: lt("Lihat semua paket day trip di halaman Tour Packages.", "See all day trip packages on the Tour Packages page."),
    highlights: [],
    includes: [],
    excludes: [],
    faq: [],
  },
  {
    slug: "tour-package",
    sortOrder: 5,
    linkHref: "/tour",
    title: lt("Tour Package", "Tour Package"),
    shortDescription: lt(
      "Paket tour privat dengan itinerary lengkap: sunrise, Nusa Penida, budaya, dan adventure.",
      "Private tour packages with complete itineraries: sunrise, Nusa Penida, culture, and adventure."
    ),
    description: lt("Lihat semua paket tour di halaman Tour Packages.", "See all tour packages on the Tour Packages page."),
    highlights: [],
    includes: [],
    excludes: [],
    faq: [],
  },
  {
    slug: "group-trip",
    sortOrder: 6,
    linkHref: "/transport",
    title: lt("Group Trip", "Group Trip"),
    shortDescription: lt(
      "Perjalanan rombongan dengan armada yang pas untuk jumlah peserta — lihat detail dan harga per zona.",
      "Group travel with the right vehicle for your party size — see details and zone prices."
    ),
    description: lt("Lihat armada dan harga per zona di halaman Transport.", "See our fleet and zone prices on the Transport page."),
    highlights: [],
    includes: [],
    excludes: [],
    faq: [],
  },
  {
    slug: "couple-package",
    sortOrder: 7,
    title: lt("Couple Package", "Couple Package"),
    shortDescription: lt(
      "Paket perjalanan privat untuk berdua dengan itinerary yang bisa disesuaikan.",
      "Private trip packages for two with a customizable itinerary."
    ),
    description: lt(
      "Habiskan waktu berkualitas berdua tanpa digabung dengan wisatawan lain. Kami bantu menyusun itinerary sesuai selera kalian, dari spot romantis hingga aktivitas santai.",
      "Spend quality time together without sharing with other travelers. We help plan an itinerary to your taste, from romantic spots to relaxed activities."
    ),
    highlights: [
      lt("Privat — hanya untuk berdua", "Private — just the two of you"),
      lt("Itinerary fleksibel sesuai keinginan", "Flexible itinerary built around you"),
      lt("Konsultasi & penyusunan itinerary gratis", "Free consultation & itinerary planning"),
    ],
    ...common,
    faq: [],
  },
  {
    slug: "honeymoon-package",
    sortOrder: 8,
    title: lt("Honeymoon Package", "Honeymoon Package"),
    shortDescription: lt(
      "Paket bulan madu privat dengan rute dan suasana yang kamu inginkan.",
      "Private honeymoon packages with the route and atmosphere you want."
    ),
    description: lt(
      "Rayakan awal perjalanan hidup bersama dengan pengalaman yang berkesan. Ceritakan rencana dan keinginan kalian, tim kami bantu merancang paket bulan madu yang nyaman dan personal.",
      "Celebrate the start of your life together with a memorable experience. Tell us your plans and wishes, and our team will design a comfortable, personal honeymoon package."
    ),
    highlights: [
      lt("Paket personal sesuai permintaan", "Personal packages tailored to your request"),
      lt("Kendaraan nyaman & driver berpengalaman", "Comfortable vehicle & experienced driver"),
      lt("Konsultasi gratis lewat WhatsApp", "Free consultation via WhatsApp"),
    ],
    ...common,
    faq: [],
  },
  {
    slug: "activity-organizer",
    sortOrder: 9,
    title: lt("Activity Organizer", "Activity Organizer"),
    shortDescription: lt(
      "Kami bantu mengatur aktivitas seru selama liburan kamu di Bali.",
      "We help arrange exciting activities during your holiday in Bali."
    ),
    description: lt(
      "Mau mencoba aktivitas tertentu tapi bingung mengaturnya? Sampaikan keinginanmu, kami bantu atur aktivitas, transportasi, dan jadwalnya agar liburan berjalan lancar.",
      "Want to try a particular activity but not sure how to arrange it? Tell us what you have in mind and we'll help organize the activity, transport, and schedule so your holiday runs smoothly."
    ),
    highlights: [
      lt("Aktivitas diatur sesuai minat & jadwal kamu", "Activities arranged around your interests & schedule"),
      lt("Transportasi bisa sekalian diatur", "Transport can be arranged together"),
      lt("Konsultasi gratis lewat WhatsApp", "Free consultation via WhatsApp"),
    ],
    includes: [],
    excludes: [],
    faq: [],
  },
];

export async function seedServicesAndZones(prisma: PrismaClient) {
  // 4 zona transport — deskripsi area dikosongkan, diisi admin lewat Admin > Transport > Kelola Zona
  for (const n of [1, 2, 3, 4]) {
    await prisma.transportZone.upsert({
      where: { number: n },
      update: {},
      create: { number: n, description: { id: "" } },
    });
  }

  for (const s of servicesData) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {},
      create: {
        slug: s.slug,
        sortOrder: s.sortOrder,
        showTransportCta: "showTransportCta" in s ? Boolean(s.showTransportCta) : false,
        linkHref: "linkHref" in s ? (s.linkHref as string) : null,
        title: s.title,
        shortDescription: s.shortDescription,
        description: s.description,
        highlights: s.highlights,
        includes: s.includes,
        excludes: s.excludes,
        faq: s.faq,
        published: true,
      },
    });
  }
}
