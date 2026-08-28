# CDA Bali Tour — Website + CMS (PT. CDA)

Website tour & transport Bali dibangun dengan **Next.js 16** (App Router), **TypeScript**, **Tailwind CSS v4**, komponen ala **shadcn/ui**, database **Supabase (Postgres)** lewat **Prisma ORM**, animasi **AOS**, dan notifikasi **SweetAlert2**. Sudah termasuk **CMS admin** sederhana untuk mengelola tour, transport, testimoni, dan pesan masuk tanpa perlu sentuh kode.

---

## 1. Setup Supabase (database)

1. Buka [supabase.com](https://supabase.com) → **New Project**.
2. Isi nama project (misal `cda-bali-tour`), buat password database yang kuat (**catat password ini**), pilih region terdekat (misal Singapore).
3. Tunggu project selesai dibuat (±2 menit).
4. Masuk ke **Project Settings → Database**.
5. Di bagian **Connection String**, kamu akan melihat dua mode:
   - **Transaction pooler** (port `6543`) → dipakai untuk `DATABASE_URL`
   - **Session/Direct connection** (port `5432`) → dipakai untuk `DIRECT_URL` (khusus migrasi)
6. Salin kedua connection string tersebut, ganti `[YOUR-PASSWORD]` dengan password yang kamu buat di langkah 2.

## 2. Install & konfigurasi project

```bash
cd cda-bali-tour
npm install
```

Salin `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

Buka `.env`, isi:

```env
DATABASE_URL="...connection string pooler (6543) dari Supabase..."
DIRECT_URL="...connection string direct (5432) dari Supabase..."
ADMIN_EMAIL="admin@cdabalitour.com"
ADMIN_PASSWORD_HASH=""
AUTH_SECRET="isi-string-acak-panjang"
```

**Generate `AUTH_SECRET`** (jalankan salah satu):
```bash
openssl rand -base64 32
```

**Generate `ADMIN_PASSWORD_HASH`** — jangan isi password polos di `.env`:
```bash
npm run hash-password -- "passwordAdminKamu"
```
Salin hasil `ADMIN_PASSWORD_HASH="..."` yang muncul ke file `.env`.

## 3. Migrasi & isi database

```bash
# generate Prisma Client sesuai schema
npm run db:generate

# buat tabel-tabel di Supabase sesuai schema.prisma
npm run db:migrate

# isi database dengan data contoh (tour, transport, testimoni)
npm run db:seed
```

`npm run db:migrate` akan minta nama migrasi — isi bebas, misal `init`.

## 4. Jalankan project

```bash
npm run dev
```

- Website: `http://localhost:3000`
- Admin CMS: `http://localhost:3000/admin/login` (pakai `ADMIN_EMAIL` & password yang kamu hash di langkah 2)

---

## Struktur project

```
prisma/
  schema.prisma        → definisi tabel database
  seed.ts               → data awal (opsional, sekali jalan)
scripts/
  hash-password.ts      → generate hash password admin
src/
  middleware.ts          → proteksi semua route /admin/*
  lib/
    prisma.ts            → Prisma client singleton
    auth.ts               → JWT session admin
    mappers.ts            → konversi tipe Prisma → tipe komponen UI
    form-parsers.ts       → parsing textarea multi-baris jadi array/objek
    inquiries.ts           → helper simpan pesan masuk
  app/
    page.tsx               → Homepage (fetch dari Prisma)
    tour/, transport/, gallery/, tentang-kami/, kontak/  → halaman publik
    admin/
      login/                → halaman login
      (protected)/           → semua halaman admin yang butuh login
        page.tsx               → dashboard
        tours/                 → CRUD tour package
        transport/             → CRUD armada
        testimonials/          → kelola testimoni
        inquiries/             → lihat & kelola pesan masuk
  components/
    ui/                    → komponen dasar (Button, Card, dst — gaya shadcn/ui)
    layout/                → Navbar, Footer, WhatsApp float
    sections/               → Hero, Testimonials, TourCard, dll
    admin/                  → Form & tombol khusus admin
    aos-init.tsx            → inisialisasi animasi AOS
```

## Mengelola konten (CMS)

Login ke `/admin`, lalu:

- **Tour Packages** → tambah/edit/hapus paket tour. Field array (highlights, includes, excludes, gallery) diisi **satu item per baris**. Itinerary pakai format `05.30 - Aktivitas`, FAQ pakai format `Pertanyaan :: Jawaban`.
- **Transport** → kelola armada sewa mobil.
- **Testimonials** → tambah/hapus testimoni yang tampil di homepage.
- **Inquiries** → lihat semua pesan dari form kontak, ubah status (Baru/Diproses/Selesai).

Tidak perlu edit kode untuk hal-hal di atas — semua perubahan langsung tampil di website (ada revalidasi otomatis).

## AOS (Animate On Scroll)

Sudah aktif secara global lewat `src/components/aos-init.tsx`. Untuk menambah animasi ke elemen baru, tinggal tambahkan atribut:

```tsx
<div data-aos="fade-up" data-aos-delay="100">...</div>
```

Efek lain yang tersedia: `fade-up`, `fade-down`, `zoom-in`, `slide-up`, dll — lihat [dokumentasi AOS](https://michalsnik.github.io/aos/).

## SweetAlert2

Dipakai untuk:
- Notifikasi sukses/gagal saat submit form kontak (`src/components/sections/contact-form.tsx`)
- Konfirmasi sebelum menghapus data di admin (`src/components/admin/delete-button.tsx`)

Untuk pakai di tempat lain:
```tsx
import Swal from "sweetalert2";
await Swal.fire({ title: "Judul", text: "Pesan", icon: "success" });
```

## Mengganti gambar

Saat ini pakai placeholder Picsum. Untuk ganti ke foto asli, edit field `coverImage`/`gallery`/`image` langsung dari halaman admin, isi dengan URL foto asli (bisa upload dulu ke layanan seperti Cloudinary/Supabase Storage, lalu tempel URL-nya).

Kalau pakai domain gambar baru, tambahkan di `next.config.ts`:
```ts
images: {
  remotePatterns: [
    { protocol: "https", hostname: "domain-gambar-baru.com" },
  ],
},
```

## SEO yang sudah disiapkan

- Metadata unik per halaman + per tour (`generateMetadata`)
- `sitemap.xml` & `robots.txt` otomatis, sitemap ambil data langsung dari database
- JSON-LD structured data: `TravelAgency` (global) & `TouristTrip` (per tour)
- ISR (`revalidate = 60`) — halaman selalu segar tanpa perlu rebuild manual
- Static Generation untuk semua slug tour yang sudah ada saat build

**Setelah live**, jangan lupa:
1. Ganti `url` di `src/config/site.ts` ke domain asli
2. Submit `https://domainkamu.com/sitemap.xml` ke [Google Search Console](https://search.google.com/search-console)
3. Buat Google Business Profile dengan nama & alamat yang identik dengan website

## Build & deploy

```bash
npm run build
npm start
```

Deploy termudah lewat [Vercel](https://vercel.com): hubungkan repo GitHub, isi environment variables yang sama seperti `.env` di dashboard Vercel, lalu deploy. Vercel akan otomatis menjalankan `prisma generate` lewat script `postinstall`.

**Penting**: jalankan `npm run db:migrate` dari komputer lokal (bukan dari Vercel) setiap kali ada perubahan `schema.prisma`, karena migrasi butuh koneksi `DIRECT_URL` yang biasanya tidak dijalankan otomatis saat deploy.
