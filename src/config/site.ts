export type NavItem = { labelKey: string; href: string; children?: NavItem[] };

export const siteConfig = {
  companyLegalName: "PT. Cahaya Dimbo Abadi",
  brandName: "CDA Bali Tour",
  tagline: "Explore Bali, The Way It Should Be",
  url: "https://www.cdabalitour.com", // ganti sesuai domain yang dibeli nanti
  ogImage: "/images/og-cover.jpg",
  phone: "+62 813-3917-2556",
  whatsapp: "6281339172556",
  email: "info@cdabalitour.com",
  address: "Gg. Jepun No.4, Padangsambian, Kec. Denpasar Bar., Kota Denpasar, Bali 80118",
  // Koordinat presisi untuk embed peta di halaman Kontak (bukan cuma cari teks alamat)
  mapCoordinates: { lat: -8.6454061, lng: 115.1915991 },
  socials: {
    instagram: "https://www.instagram.com/balitourntravelcda/",
    facebook: "https://facebook.com/cdabalitour",
    tripadvisor: "https://tripadvisor.com",
  },
  // Kredit developer di footer — ganti "url" ke link yang kamu mau (portofolio, LinkedIn, dll)
  developer: {
    name: "Daniel Widhi",
    url: "https://daniel.gdpartstudio.my.id",
  },
  // Menu bisa bertingkat (children di dalam children). Label diambil dari messages (namespace "nav").
  nav: [
    {
      labelKey: "ourService",
      href: "/services",
      children: [
        { labelKey: "allServices", href: "/services" },
        { labelKey: "rentCar", href: "/services/rent-car" },
        { labelKey: "airportTransfer", href: "/services/airport-transfer" },
        { labelKey: "hotelTransfer", href: "/services/hotel-transfer" },
        {
          labelKey: "tourPackages",
          href: "/tour",
          children: [
            { labelKey: "allPackages", href: "/tour" },
            { labelKey: "sunriseTour", href: "/tour?category=sunrise" },
            { labelKey: "dayTour", href: "/tour?category=day-tour" },
            { labelKey: "nusaPenida", href: "/tour?category=nusa-penida" },
            { labelKey: "adventure", href: "/tour?category=adventure" },
          ],
        },
        { labelKey: "groupTrip", href: "/transport" },
        { labelKey: "couplePackage", href: "/services/couple-package" },
        { labelKey: "honeymoonPackage", href: "/services/honeymoon-package" },
        { labelKey: "activityOrganizer", href: "/services/activity-organizer" },
      ],
    },
    { labelKey: "transport", href: "/transport" },
    { labelKey: "gallery", href: "/gallery" },
    { labelKey: "aboutUs", href: "/tentang-kami" },
    { labelKey: "testimonials", href: "/testimoni" },
    { labelKey: "contact", href: "/kontak" },
  ] as NavItem[],
};

export type SiteConfig = typeof siteConfig;
