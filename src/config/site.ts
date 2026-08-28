export const siteConfig = {
  companyLegalName: "PT. CDA",
  brandName: "CDA Bali Tour",
  tagline: "Explore Bali, The Way It Should Be",
  description:
    "CDA Bali Tour menyediakan paket tour, sewa mobil dengan driver, dan aktivitas wisata di Bali dengan harga transparan tanpa biaya tersembunyi. Legal, berpengalaman, dan dipercaya ribuan wisatawan.",
  url: "https://www.cdabalitour.com", // ganti sesuai domain yang dibeli nanti
  ogImage: "/images/og-cover.jpg",
  phone: "+62 812-3703-3488",
  whatsapp: "6281237033488",
  email: "info@cdabalitour.com",
  address: "Gg. Tunjung Sari, Batubulan Kangin, Sukawati, Gianyar, Bali 80582",
  socials: {
    instagram: "https://instagram.com/cdabalitour",
    facebook: "https://facebook.com/cdabalitour",
    tripadvisor: "https://tripadvisor.com",
  },
  nav: [
    {
      label: "Tour Packages",
      href: "/tour",
      children: [
        { label: "Semua Paket", href: "/tour" },
        { label: "Sunrise Tour", href: "/tour?category=sunrise" },
        { label: "Day Tour", href: "/tour?category=day-tour" },
        { label: "Nusa Penida", href: "/tour?category=nusa-penida" },
        { label: "Adventure", href: "/tour?category=adventure" },
      ],
    },
    { label: "Transport", href: "/transport" },
    { label: "Gallery", href: "/gallery" },
    { label: "Tentang Kami", href: "/tentang-kami" },
    { label: "Kontak", href: "/kontak" },
  ],
};

export type SiteConfig = typeof siteConfig;
