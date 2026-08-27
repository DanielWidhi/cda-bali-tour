import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, Users, Clock3 } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "PT. CDA adalah tour operator legal di Bali dengan pengalaman lebih dari 9 tahun, melayani ribuan wisatawan dengan harga transparan dan pelayanan terpercaya.",
  alternates: { canonical: "/tentang-kami" },
};

const stats = [
  { icon: Clock3, label: "9+ tahun pengalaman" },
  { icon: Users, label: "5.000+ wisatawan terlayani" },
  { icon: ShieldCheck, label: "Legal & berizin resmi" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 lg:px-8 py-16">
      <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-amber-deep)]">
        Tentang Kami
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl mt-3 max-w-2xl">
        Bertahun-tahun mengantar wisatawan melihat Bali dari sisi yang jarang
        ditemukan sendiri
      </h1>

      <div className="relative aspect-[16/8] rounded-2xl overflow-hidden mt-8">
        <Image
          src="https://picsum.photos/seed/about-team/1600/800"
          alt="Tim driver dan pemandu PT. CDA di Bali"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mt-8">
        {stats.map(({ icon: Icon, label }) => (
          <div key={label} className="rounded-xl border border-black/10 p-5 flex items-center gap-3">
            <Icon className="h-5 w-5 text-[color:var(--color-amber-deep)]" />
            <span className="text-sm font-medium">{label}</span>
          </div>
        ))}
      </div>

      <div className="mt-10 prose prose-neutral max-w-none text-black/70 leading-relaxed">
        <p>
          {siteConfig.companyLegalName} adalah operator tour resmi yang
          berbasis di Gianyar, Bali. Kami memulai dari layanan sewa mobil
          dengan driver kecil-kecilan, dan kini telah berkembang menjadi
          penyedia paket tour, transport, dan aktivitas wisata yang dipercaya
          ribuan wisatawan dari berbagai negara.
        </p>
        <p>
          Kami percaya bahwa pengalaman berlibur terbaik datang dari
          keterbukaan: harga yang jelas sejak awal, driver yang benar-benar
          mengenal budaya dan medan Bali, serta layanan yang bisa dibayar
          setelah perjalanan selesai — bukan sebelum Anda yakin.
        </p>
        <p>
          Ketika diperlukan, kami juga bekerja sama dengan pemandu wisata
          berlisensi yang memiliki pengetahuan mendalam tentang sejarah dan
          seni Bali, sehingga setiap cerita yang Anda dengar sepanjang
          perjalanan benar-benar akurat dan berarti.
        </p>
      </div>
    </div>
  );
}
