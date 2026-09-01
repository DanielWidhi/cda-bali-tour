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
npm run create-admin -- "admin@cdabalitour.com" "passwordKuat123" "Nama Kamu"
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
  schema.prisma           → definisi tabel database (tour, transport, testimoni, inquiry, gallery, profile/role)
  seed.ts                  → data awal (opsional, sekali jalan)
scripts/
  create-admin.ts           → bikin akun Superadmin pertama di Supabase Auth
messages/
  id.json, en.json           → semua teks UI publik (Bahasa Indonesia & English)
src/
  middleware.ts              → gabungan: proteksi /admin (Supabase session) + routing locale (next-intl)
  i18n/
    routing.ts                 → konfigurasi locale (id default, en opsional, prefix "as-needed")
    navigation.ts               → Link/useRouter/redirect locale-aware (pengganti next/link)
    request.ts                   → loader file messages/{locale}.json
  lib/
    prisma.ts                 → Prisma client singleton
    current-profile.ts         → ambil profil (nama, role) admin yang login
    supabase/
      client.ts                 → Supabase client untuk browser
      server.ts                 → Supabase client untuk Server Component/Action
      middleware.ts              → refresh session di middleware
      admin.ts                   → Supabase client service-role (storage upload, kelola user admin)
    mappers.ts                  → konversi tipe Prisma → tipe komponen UI
    form-parsers.ts              → parsing textarea multi-baris jadi array/objek
  app/
    layout.tsx                 → root layout MINIMAL (html/body/font saja — tidak ada Navbar/Footer!)
    [locale]/                   → SEMUA halaman publik (otomatis dapat prefix /en untuk bahasa Inggris)
      layout.tsx                  → Navbar, Footer, WhatsApp float, AOS, NextIntlClientProvider
      page.tsx                     → Homepage (fetch dari Prisma)
      tour/, transport/, gallery/, tentang-kami/, testimoni/, kontak/
    actions/
      inquiry-actions.ts          → Server Action simpan pesan (dipakai form kontak)
    api/admin/upload/route.ts   → endpoint upload gambar ke Supabase Storage (khusus admin login)
    admin/                       → TIDAK di-i18n-kan, tetap Bahasa Indonesia, di luar folder [locale]
      login/                       → halaman login
      actions-auth.ts               → Server Action login/logout (Supabase Auth)
      (protected)/                   → semua halaman admin yang butuh login
        page.tsx                       → dashboard
        tours/                          → CRUD tour package (dengan upload gambar)
        transport/                      → CRUD armada (dengan upload gambar)
        gallery/                        → upload & kelola foto gallery publik
        testimonials/                    → approve/reject testimoni dari user + tambah manual
        inquiries/                        → lihat & kelola pesan masuk
        users/                            → CRUD akun admin (khusus role Superadmin)
  components/
    ui/                        → komponen dasar (Button, Card, dst — gaya shadcn/ui)
    layout/                     → Navbar, Footer, WhatsApp float, LanguageSwitcher, AOSInit
    sections/                    → Hero, Testimonials, TourCard, form kontak/testimoni, dll
    admin/                        → AdminShell (header+sidebar+footer), form, upload gambar, dll
```

## Multi-bahasa (i18n)

Website publik mendukung **Bahasa Indonesia** (default, tanpa prefix URL, misal `/tour`) dan **English** (prefix `/en`, misal `/en/tour`). Pengunjung bisa ganti bahasa lewat tombol **ID/EN** di navbar.

**Yang sudah diterjemahkan otomatis:** seluruh teks UI tetap (navbar, footer, judul halaman, label form, tombol, FAQ).

**Yang TIDAK ikut diterjemahkan** (dan ini keputusan desain yang disengaja): konten yang diinput admin lewat CMS — judul/deskripsi tour, nama armada, isi testimoni, dll — karena itu data dinamis yang admin isi sendiri dalam satu bahasa. Kalau ke depannya kamu butuh tour package dengan judul/deskripsi berbeda per bahasa, itu perlu penambahan struktur database (field terpisah per locale) — kabari saya kalau butuh ini.

**Menambah/ubah teks terjemahan:** edit `messages/id.json` dan `messages/en.json`, pastikan strukturnya sama persis di kedua file.

**Halaman admin sengaja tidak di-i18n-kan** — tetap Bahasa Indonesia saja, karena biasanya dioperasikan oleh tim lokal.

## Kenapa login admin tidak ada di Table Editor Supabase?

Supabase Auth menyimpan data user di schema database khusus bernama `auth` (tabel `auth.users`), terpisah dari schema `public` yang biasa kamu lihat di **Table Editor**. Ini standar keamanan Supabase — supaya data kredensial tidak tercampur dengan data aplikasi biasa. Untuk melihat/mengelola user admin, buka tab **Authentication → Users** di dashboard, bukan Table Editor.

## Role Admin: Superadmin vs Admin

- **Superadmin**: akses penuh, termasuk halaman **Users** — bisa tambah, edit, dan hapus akun admin lain.
- **Admin**: bisa mengelola semua konten (tour, transport, gallery, testimonial, inquiry), tapi halaman **Users** read-only — tidak bisa tambah/edit/hapus akun siapa pun (termasuk dirinya sendiri).

Akun pertama yang dibuat lewat `npm run create-admin` otomatis jadi **Superadmin**. Admin berikutnya ditambahkan lewat halaman `/admin/users` (bukan script lagi).

## Upload Gambar

Tour Package, Transport, dan Gallery admin punya **upload area drag-and-drop** (bukan input URL manual) — mendukung PNG, JPG, WEBP, GIF, maksimal 5MB per file. File tersimpan di **Supabase Storage**.

**Wajib disiapkan sebelum upload berfungsi**: buat bucket storage bernama `cda-images` di Supabase Dashboard → **Storage** → New bucket, centang **Public bucket** (supaya gambar bisa diakses publik oleh pengunjung website).

## Testimoni dari User

Halaman `/testimoni` memungkinkan wisatawan submit testimoni sendiri (Nama, Asal, No. Telp, Rating, Tour Terkait, Isi Testimoni). Testimoni ini **tidak langsung tayang** — berstatus "menunggu approval" sampai admin menyetujuinya lewat halaman `/admin/testimonials`. Testimoni yang admin input manual dari CMS langsung tayang tanpa approval.

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
