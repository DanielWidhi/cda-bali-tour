import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      { protocol: "https", hostname: "*.supabase.co" }, // Supabase Storage (upload gambar admin)
      // Saat pindah ke gambar asli, tambahkan domain CDN/storage di sini
      // atau hapus seluruh remotePatterns jika semua gambar disimpan di /public
    ],
  },
};

export default withNextIntl(nextConfig);
