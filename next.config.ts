import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      // Saat pindah ke gambar asli, tambahkan domain CDN/storage di sini
      // atau hapus seluruh remotePatterns jika semua gambar disimpan di /public
    ],
  },
};

export default nextConfig;
