# CDA Bali Tour — Website (PT. CDA)

Website tour & transport Bali dibangun dengan Next.js 16 (App Router), TypeScript, Tailwind CSS v4, dan komponen ala shadcn/ui.

## Menjalankan project di komputer lokal

Pastikan sudah terinstall **Node.js versi 20 ke atas**.

```bash
# 1. Masuk ke folder project
cd cda-bali-tour

# 2. Install semua dependency
npm install

# 3. Jalankan development server
npm run dev
```

Buka `http://localhost:3000` di browser.

## Struktur project

```
src/
  app/                  → routing (setiap folder = 1 halaman/URL)
    page.tsx            → Homepage
    tour/page.tsx        → Listing tour
    tour/[slug]/page.tsx → Detail tour (dynamic route)
    transport/page.tsx   → Sewa mobil
    tentang-kami/         → About us
    kontak/               → Contact
    gallery/              → Gallery
    sitemap.ts            → Sitemap otomatis (SEO)
    robots.ts             → robots.txt otomatis (SEO)
  components/
    ui/                  → komponen dasar shadcn-style (Button, Card, dll)
    layout/              → Navbar, Footer, WhatsApp float, Ridge divider
    sections/             → Section-section besar (Hero, Testimonials, dll)
  data/                  → "Database sementara" — array TypeScript berisi tour, transport, testimoni
  config/site.ts         → Semua info bisnis terpusat (nama, kontak, nav menu)
  types/                 → TypeScript interfaces
```

## Cara menambah / mengubah tour package

Tidak perlu database dulu — cukup edit **`src/data/tours.ts`**, tambahkan object baru ke array `tours`. Halaman detail (`/tour/[slug]`) akan otomatis ter-generate berdasarkan `slug` yang kamu isi, termasuk masuk ke sitemap.

## Mengganti gambar

Semua gambar saat ini pakai placeholder dari Picsum (`picsum.photos`) supaya bisa langsung dilihat hasilnya. Untuk memakai foto asli:

1. Taruh file foto di folder `public/images/...`
2. Ganti path di `src/data/tours.ts`, `src/data/transport.ts`, atau komponen terkait dari URL Picsum menjadi path lokal, misalnya `/images/tours/batur-sunrise.jpg`
3. Kalau nanti pakai CDN gambar (Cloudinary/S3/dst), tambahkan domainnya di `next.config.ts` bagian `images.remotePatterns`

## Mengganti info bisnis (nama, WhatsApp, alamat, dst)

Edit satu file saja: **`src/config/site.ts`**

## SEO yang sudah disiapkan

- Metadata unik per halaman (`generateMetadata`)
- `sitemap.xml` & `robots.txt` otomatis (`/sitemap.ts`, `/robots.ts`)
- JSON-LD structured data: `TravelAgency` (global) dan `TouristTrip` (per halaman tour) — supaya berpotensi muncul rich snippet di Google
- Static Generation (SSG) untuk semua halaman detail tour → loading cepat
- Gambar dioptimasi otomatis lewat `next/image`

**Yang perlu kamu lakukan setelah live:**
1. Ganti `url` di `src/config/site.ts` ke domain asli
2. Daftarkan domain ke [Google Search Console](https://search.google.com/search-console) dan submit `https://domainkamu.com/sitemap.xml`
3. Buat akun Google Business Profile dengan nama & alamat yang sama persis dengan yang ada di website (penting untuk local SEO)

## Build untuk production

```bash
npm run build
npm start
```

## Deploy

Cara termudah: deploy ke [Vercel](https://vercel.com) (pembuat Next.js) — cukup hubungkan repo GitHub, otomatis ter-deploy setiap kali push.
