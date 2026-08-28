# CDA Bali Tour — Website + CMS (PT. CDA)

Website tour & transport Bali dibangun dengan **Next.js 16** (App Router), **TypeScript**, **Tailwind CSS v4**, komponen ala **shadcn/ui**, database **Supabase (Postgres)** lewat **Prisma ORM**, login admin pakai **Supabase Auth**, animasi **AOS**, dan notifikasi **SweetAlert2**. Sudah termasuk **CMS admin** untuk mengelola tour, transport, testimoni, dan pesan masuk tanpa perlu sentuh kode.

---

## 1. Buat project Supabase

1. Buka [supabase.com](https://supabase.com) → **New Project**.
2. Isi nama project (misal `cda-bali-tour`), buat password database yang kuat (**catat password ini**, dipakai di langkah 3), pilih region terdekat (misal Singapore).
3. Tunggu project selesai dibuat (±2 menit).

## 2. Install project & isi `.env`

```bash
cd cda-bali-tour
npm install
cp .env.example .env
```

Buka `.env` dan isi 3 kelompok variabel berikut:

**a) Database (untuk Prisma)** — dari **Project Settings → Database → Connection String**:
```env
DATABASE_URL="...connection pooler, port 6543..."
DIRECT_URL="...direct connection, port 5432..."
```
(ganti `[PASSWORD]` dengan password yang kamu buat di langkah 1)

**b) Auth (untuk login admin)** — dari **Project Settings → API**:
```env
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."          # key "anon public"
SUPABASE_SERVICE_ROLE_KEY="eyJ..."               # key "service_role secret" — RAHASIA!
```

> ⚠️ `SUPABASE_SERVICE_ROLE_KEY` punya akses penuh ke database & auth. Jangan pernah dipakai di kode yang jalan di browser, dan jangan commit ke git (sudah otomatis di-`.gitignore`).

## 3. Setup database (Prisma)

```bash
npm run db:generate   # generate Prisma Client sesuai schema
npm run db:migrate     # buat tabel-tabel di Supabase
npm run db:seed         # isi data contoh (tour, transport, testimoni)
```

`npm run db:migrate` akan minta nama migrasi — isi bebas, misal `init`.

## 4. Buat akun admin (Supabase Auth)

Login CMS **tidak** pakai tabel database biasa, tapi sistem **Supabase Auth** bawaan. Buat akun admin pertama lewat script:

```bash
npm run create-admin -- "admin@cdabalitour.com" "passwordKuat123"
```

Setelah ini, akun tersebut akan muncul di Supabase Dashboard pada **Authentication → Users** (bukan di Table Editor — Supabase Auth memang menyimpan user di schema `auth` yang terpisah dan hanya tampil di tab Authentication, bukan sebagai tabel biasa).

Mau tambah admin lain? Jalankan lagi command yang sama dengan email berbeda, atau tambahkan manual lewat **Authentication → Users → Add User** di dashboard Supabase.

## 5. Jalankan project

```bash
npm run dev
```

- Website: `http://localhost:3000`
- Login admin: `http://localhost:3000/admin/login` — pakai email & password dari langkah 4

---

## Struktur project

```
prisma/
  schema.prisma           → definisi tabel database (tour, transport, testimoni, inquiry)
  seed.ts                  → data awal (opsional, sekali jalan)
scripts/
  create-admin.ts           → bikin user admin di Supabase Auth
src/
  middleware.ts              → proteksi semua route /admin/* via Supabase session
  lib/
    prisma.ts                 → Prisma client singleton
    supabase/
      client.ts                 → Supabase client untuk browser
      server.ts                 → Supabase client untuk Server Component/Action
      middleware.ts              → refresh session di middleware
    mappers.ts                  → konversi tipe Prisma → tipe komponen UI
    form-parsers.ts              → parsing textarea multi-baris jadi array/objek
    inquiries.ts                  → helper simpan pesan masuk
  app/
    page.tsx                    → Homepage (fetch dari Prisma)
    tour/, transport/, gallery/, tentang-kami/, kontak/  → halaman publik
    admin/
      login/                       → halaman login
      actions-auth.ts               → Server Action login/logout (Supabase Auth)
      (protected)/                   → semua halaman admin yang butuh login
        page.tsx                       → dashboard
        tours/                          → CRUD tour package
        transport/                      → CRUD armada
        testimonials/                    → kelola testimoni
        inquiries/                        → lihat & kelola pesan masuk
  components/
    ui/                        → komponen dasar (Button, Card, dst — gaya shadcn/ui)
    layout/                     → Navbar, Footer, WhatsApp float
    sections/                    → Hero, Testimonials, TourCard, dll
    admin/                        → Form & tombol khusus admin
    aos-init.tsx                  → inisialisasi animasi AOS
```

## Kenapa login admin tidak ada di Table Editor Supabase?

Supabase Auth menyimpan data user di schema database khusus bernama `auth` (tabel `auth.users`), terpisah dari schema `public` yang biasa kamu lihat di **Table Editor**. Ini standar keamanan Supabase — supaya data kredensial tidak tercampur dengan data aplikasi biasa. Untuk melihat/mengelola user admin, buka tab **Authentication → Users** di dashboard, bukan Table Editor.

## Mengelola konten (CMS)

Login ke `/admin`, lalu:

- **Tour Packages** → tambah/edit/hapus paket tour. Field array (highlights, includes, excludes, gallery) diisi **satu item per baris**. Itinerary pakai format `05.30 - Aktivitas`, FAQ pakai format `Pertanyaan :: Jawaban`.
- **Transport** → kelola armada sewa mobil.
- **Testimonials** → tambah/hapus testimoni yang tampil di homepage.
- **Inquiries** → lihat semua pesan dari form kontak, ubah status (Baru/Diproses/Selesai).

Semua perubahan langsung tampil di website tanpa perlu rebuild (revalidasi otomatis).

## AOS (Animate On Scroll)

Aktif secara global lewat `src/components/aos-init.tsx`. Tambah animasi ke elemen baru:

```tsx
<div data-aos="fade-up" data-aos-delay="100">...</div>
```

Efek lain: `fade-up`, `fade-down`, `zoom-in`, `slide-up`, dll — lihat [dokumentasi AOS](https://michalsnik.github.io/aos/).

## SweetAlert2

Dipakai untuk notifikasi sukses/gagal di form kontak dan konfirmasi hapus data di admin. Untuk pakai di tempat lain:

```tsx
import Swal from "sweetalert2";
await Swal.fire({ title: "Judul", text: "Pesan", icon: "success" });
```

## Mengganti gambar

Saat ini pakai placeholder Picsum. Edit field `coverImage`/`gallery`/`image` langsung dari halaman admin dan isi dengan URL foto asli (upload dulu ke layanan seperti Cloudinary/Supabase Storage, lalu tempel URL-nya).

Domain gambar baru perlu ditambahkan di `next.config.ts`:
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

Deploy termudah lewat [Vercel](https://vercel.com): hubungkan repo GitHub, isi semua environment variables yang sama seperti `.env` di dashboard Vercel, lalu deploy.

**Penting**: jalankan `npm run db:migrate` dari komputer lokal (bukan dari Vercel) setiap kali ada perubahan `schema.prisma`, karena migrasi butuh koneksi `DIRECT_URL` yang tidak dijalankan otomatis saat deploy.
