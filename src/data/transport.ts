import { TransportOption } from "@/types";

export const transportOptions: TransportOption[] = [
  {
    slug: "avanza-xenia",
    name: "Toyota Avanza / Xenia",
    capacity: "4-5 orang",
    pricePerDay: 500000,
    hours: 10,
    image: "https://picsum.photos/seed/avanza/800/600",
  },
  {
    slug: "suzuki-apv",
    name: "Suzuki APV",
    capacity: "5-6 orang",
    pricePerDay: 550000,
    hours: 10,
    image: "https://picsum.photos/seed/apv/800/600",
  },
  {
    slug: "isuzu-elf",
    name: "Isuzu ELF Short",
    capacity: "10-12 orang",
    pricePerDay: 1000000,
    hours: 10,
    image: "https://picsum.photos/seed/elf/800/600",
  },
  {
    slug: "toyota-hiace",
    name: "Toyota Hiace",
    capacity: "12-14 orang",
    pricePerDay: 1300000,
    hours: 10,
    image: "https://picsum.photos/seed/hiace/800/600",
  },
];

export const transportIncludes = [
  "Driver berbahasa Inggris yang berpengalaman",
  "BBM selama perjalanan",
  "Mobil ber-AC & terawat",
  "Pajak & asuransi kendaraan",
];

export const transportExcludes = [
  "Tiket masuk objek wisata",
  "Biaya parkir",
  "Makan & minum",
  "Pengeluaran pribadi",
];
