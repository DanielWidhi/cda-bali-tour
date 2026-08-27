import { TourPackage } from "@/types";

export const tours: TourPackage[] = [
  {
    slug: "sunrise-mount-batur-jeep",
    title: "Sunrise Mount Batur by Private 4WD Jeep",
    category: "sunrise",
    categoryLabel: "Sunrise Tour",
    location: "Kintamani, Bali",
    duration: "5 jam",
    price: 550000,
    originalPrice: 650000,
    rating: 4.9,
    reviewCount: 214,
    coverImage: "https://picsum.photos/seed/batur-sunrise/1200/900",
    gallery: [
      "https://picsum.photos/seed/batur-sunrise/1200/900",
      "https://picsum.photos/seed/batur-jeep-1/1200/900",
      "https://picsum.photos/seed/batur-jeep-2/1200/900",
    ],
    shortDescription:
      "Kejar garis cahaya pertama di atas kaldera Batur dengan jeep 4WD pribadi, tanpa perlu mendaki.",
    description:
      "Berangkat sebelum subuh dari penjemputan hotel, Anda akan diantar naik jeep 4WD pribadi menyusuri jalur off-road menuju titik pandang terbaik di lereng Gunung Batur. Nikmati matahari terbit di atas kaldera sambil ditemani kopi lokal, lalu lanjutkan perjalanan melintasi hamparan lava hitam sisa letusan 1917 dan 1926.",
    highlights: [
      "Penjemputan hotel area Kuta, Seminyak, Ubud, Sanur",
      "Jeep 4WD eksklusif — tidak digabung rombongan lain",
      "Sarapan ringan & kopi Kintamani di titik sunrise",
      "Melintasi black lava trail bekas letusan Gunung Batur",
    ],
    itinerary: [
      { time: "03.30", activity: "Penjemputan dari hotel" },
      { time: "05.00", activity: "Tiba di pos awal, ganti ke jeep 4WD" },
      { time: "05.30", activity: "Menuju titik pandang sunrise terbaik" },
      { time: "06.15", activity: "Sunrise + sarapan ringan" },
      { time: "07.00", activity: "Jelajah black lava trail" },
      { time: "08.30", activity: "Kembali & antar ke hotel" },
    ],
    includes: [
      "Jeep 4WD pribadi + driver berpengalaman",
      "Penjemputan & antar hotel",
      "Sarapan ringan dan kopi",
      "Asuransi perjalanan",
    ],
    excludes: ["Tiket masuk area jika ada", "Pengeluaran pribadi", "Tip driver"],
    faq: [
      {
        question: "Apakah perlu mendaki gunung?",
        answer:
          "Tidak. Jeep akan membawa Anda langsung ke titik pandang, tanpa perlu trekking atau mendaki.",
      },
      {
        question: "Jam berapa penjemputan?",
        answer:
          "Sekitar pukul 03.00–03.30 tergantung lokasi hotel, agar tiba tepat waktu sebelum matahari terbit.",
      },
    ],
  },
  {
    slug: "nusa-penida-west-full-day",
    title: "Nusa Penida West Full Day Trip",
    category: "nusa-penida",
    categoryLabel: "Nusa Penida",
    location: "Nusa Penida",
    duration: "10 jam",
    price: 750000,
    rating: 4.8,
    reviewCount: 356,
    coverImage: "https://picsum.photos/seed/nusa-penida/1200/900",
    gallery: ["https://picsum.photos/seed/nusa-penida/1200/900"],
    shortDescription:
      "Kelingking Beach, Angel's Billabong, Broken Beach, dan Crystal Bay dalam satu hari.",
    description:
      "Menyeberang dengan fast boat pagi hari dari Sanur menuju Nusa Penida, dilanjutkan tur mengelilingi sisi barat pulau: tebing ikonik Kelingking, kolam alami Angel's Billabong, formasi batu Broken Beach, hingga snorkeling santai di Crystal Bay.",
    highlights: [
      "Fast boat PP Sanur–Nusa Penida",
      "Spot foto ikonik Kelingking Beach",
      "Snorkeling di Crystal Bay",
      "Private car selama di Nusa Penida",
    ],
    itinerary: [
      { time: "06.30", activity: "Penjemputan & menuju pelabuhan Sanur" },
      { time: "07.30", activity: "Fast boat ke Nusa Penida" },
      { time: "09.00", activity: "Kelingking Beach" },
      { time: "11.00", activity: "Angel's Billabong & Broken Beach" },
      { time: "13.00", activity: "Makan siang" },
      { time: "14.30", activity: "Snorkeling Crystal Bay" },
      { time: "16.30", activity: "Fast boat kembali ke Sanur" },
    ],
    includes: [
      "Fast boat PP",
      "Private car + driver di Nusa Penida",
      "Alat snorkeling",
      "Makan siang",
    ],
    excludes: ["Tiket masuk objek wisata", "Sewa GoPro/kamera"],
    faq: [
      {
        question: "Apakah harus bisa berenang untuk snorkeling?",
        answer:
          "Tidak wajib, life jacket disediakan dan pemandu akan selalu mendampingi.",
      },
    ],
  },
  {
    slug: "ubud-sacred-monkey-tirta-empul",
    title: "Ubud Heritage: Tirta Empul & Tegalalang",
    category: "day-tour",
    categoryLabel: "Day Tour",
    location: "Ubud, Bali",
    duration: "8 jam",
    price: 500000,
    rating: 4.7,
    reviewCount: 128,
    coverImage: "https://picsum.photos/seed/ubud-heritage/1200/900",
    gallery: ["https://picsum.photos/seed/ubud-heritage/1200/900"],
    shortDescription:
      "Pura air suci Tirta Empul, sawah berundak Tegalalang, dan pasar seni Ubud.",
    description:
      "Jelajahi sisi budaya Bali di Ubud: bersuci di mata air suci Tirta Empul, berjalan menyusuri terasering hijau Tegalalang, mampir ke Sacred Monkey Forest, dan berburu oleh-oleh di pasar seni Ubud.",
    highlights: [
      "Ritual penyucian diri di Tirta Empul",
      "Foto ikonik Tegalalang Rice Terrace",
      "Sacred Monkey Forest Sanctuary",
      "Waktu bebas di Ubud Art Market",
    ],
    itinerary: [
      { time: "08.00", activity: "Penjemputan hotel" },
      { time: "09.30", activity: "Tirta Empul Temple" },
      { time: "11.00", activity: "Tegalalang Rice Terrace" },
      { time: "12.30", activity: "Makan siang khas Bali" },
      { time: "14.00", activity: "Sacred Monkey Forest" },
      { time: "15.30", activity: "Ubud Art Market" },
      { time: "16.30", activity: "Kembali ke hotel" },
    ],
    includes: ["Private car ber-AC + driver", "Makan siang", "Air mineral"],
    excludes: ["Tiket masuk objek wisata", "Sarung untuk sembahyang (sewa di lokasi)"],
    faq: [
      {
        question: "Apakah perlu membawa pakaian khusus?",
        answer:
          "Disarankan pakaian sopan; sarung dan selendang untuk masuk area pura biasanya tersedia sewa di lokasi.",
      },
    ],
  },
  {
    slug: "uluwatu-kecak-jimbaran-sunset",
    title: "Uluwatu Temple, Kecak Fire Dance & Jimbaran Seafood",
    category: "sunrise",
    categoryLabel: "Sunset Tour",
    location: "Uluwatu, Bali",
    duration: "6 jam",
    price: 480000,
    rating: 4.8,
    reviewCount: 189,
    coverImage: "https://picsum.photos/seed/uluwatu-kecak/1200/900",
    gallery: ["https://picsum.photos/seed/uluwatu-kecak/1200/900"],
    shortDescription:
      "Sunset di tebing Uluwatu, tari Kecak, ditutup makan malam seafood tepi pantai Jimbaran.",
    description:
      "Sore hari menuju Pura Uluwatu yang berdiri di atas tebing karang menghadap Samudra Hindia, saksikan tari Kecak saat senja, lalu nikmati makan malam seafood segar dengan kaki di pasir Pantai Jimbaran.",
    highlights: [
      "Sunset di Pura Uluwatu",
      "Pertunjukan tari Kecak",
      "Makan malam seafood di tepi pantai Jimbaran",
    ],
    itinerary: [
      { time: "15.00", activity: "Penjemputan hotel" },
      { time: "16.30", activity: "Pura Uluwatu" },
      { time: "18.00", activity: "Pertunjukan Kecak Fire Dance" },
      { time: "19.00", activity: "Makan malam seafood Jimbaran" },
      { time: "20.30", activity: "Kembali ke hotel" },
    ],
    includes: ["Private car + driver", "Tiket Kecak Dance", "Makan malam seafood"],
    excludes: ["Tiket masuk Pura Uluwatu", "Minuman di luar paket"],
    faq: [],
  },
];

export function getTourBySlug(slug: string) {
  return tours.find((t) => t.slug === slug);
}

export function getToursByCategory(category?: string) {
  if (!category || category === "all") return tours;
  return tours.filter((t) => t.category === category);
}
