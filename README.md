This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Update: Mata uang, Zona Transport, dan Our Service

**Setelah mengganti kode dengan versi ini, jalankan di komputer kamu:**

```bash
npm install
npx prisma migrate dev --name currency-zones-services   # semua perubahan hanya MENAMBAH kolom/tabel, data lama aman
npm run db:seed:services                                 # isi 9 layanan "Our Service" + 4 zona (aman dijalankan berulang)
```

> Jangan timpa folder `prisma/migrations` milikmu saat meng-copy file dari zip ini. Zip ini tidak menyertakan folder itu.

### Mata uang (IDR / USD)
- Bahasa **Indonesia** menampilkan harga **IDR**, bahasa **English** menampilkan **USD**.
- Admin mengisi dua harga terpisah (tidak ada kurs otomatis, jadi harga USD bisa dibulatkan rapi). Kolom harga lama tetap = IDR.
- Kalau harga USD **kosong**, pengunjung English tetap melihat harga IDR.
- Di bahasa English muncul catatan kecil bahwa harga USD bersifat indikatif dan pembayaran dalam IDR mengikuti kurs pada hari pembayaran.
- Berlaku untuk: harga tour, harga coret, harga sewa harian transport, dan harga per zona.

### Zona Transport
- **Admin > Transport > Kelola Zona**: isi deskripsi daerah (bilingual) dan foto untuk Zona 1–4.
- **Admin > Transport > (edit armada)**: isi harga IDR/USD per zona, galeri foto, deskripsi, dan bagasi. Kosongkan harga IDR kalau zona itu tidak ditawarkan untuk armada tersebut.
- Pengunjung membuka **/transport/[slug]** untuk melihat foto, bagasi, harga tiap zona, dan tombol WhatsApp (termasuk "Tanya Rute Custom").

### Our Service
- Menu navbar "Tour Packages" sekarang **Our Service** dengan submenu bertingkat (Tour Packages tetap berisi All Packages, Sunrise, Day Tour, Nusa Penida, Adventure).
- **Admin > Services** untuk mengelola isi tiap layanan (bilingual, gambar, FAQ). Teks awal dari seed hanya contoh, silakan diedit.
- Layanan yang punya halaman sendiri (Day Trip, Tour Package, Group Trip) memakai kolom **Link tujuan**, sehingga kartunya langsung mengarah ke halaman tour/transport.
- Slug layanan yang ada di menu navbar (`rent-car`, `airport-transfer`, `hotel-transfer`, `couple-package`, `honeymoon-package`, `activity-organizer`) jangan dihapus atau di-draft.
