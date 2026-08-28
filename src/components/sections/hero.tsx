import Image from "next/image";
import Link from "next/link";
import { Star, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RidgeDivider } from "@/components/layout/ridge-divider";

export function Hero() {
  return (
    <section className="relative bg-[color:var(--color-ink)] text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://picsum.photos/seed/hero-batur-hero/1600/1000"
          alt="Sunrise di atas Gunung Batur dengan kabut kaldera, Kintamani, Bali"
          fill
          priority
          className="object-cover opacity-45"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-ink)] via-[color:var(--color-ink)]/60 to-[color:var(--color-ink)]/20" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 pt-20 pb-28 lg:pt-28 lg:pb-36">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex items-center gap-1 text-[color:var(--color-amber)]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <span className="text-sm text-white/70">4.9/5 dari 800+ wisatawan</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.08] max-w-3xl" data-aos="fade-up">
          Jelajahi Bali dengan tenang, bersama{" "}
          <span className="italic text-[color:var(--color-amber)]">pengemudi lokal</span>{" "}
          yang mengenal setiap sudutnya.
        </h1>
        <p className="mt-6 max-w-xl text-white/70 text-base sm:text-lg leading-relaxed" data-aos="fade-up" data-aos-delay="100">
          PT. CDA menghadirkan paket tour privat, sewa mobil dengan driver, dan
          aktivitas wisata di seluruh Bali — harga transparan, tanpa biaya
          tersembunyi, dan bisa dibayar setelah trip selesai.
        </p>

        <div className="mt-9 flex flex-wrap gap-4" data-aos="fade-up" data-aos-delay="200">
          <Button asChild size="lg">
            <Link href="/tour">Lihat Paket Tour</Link>
          </Button>
          <Button asChild size="lg" variant="inverse">
            <Link href="/transport">Sewa Mobil + Driver</Link>
          </Button>
        </div>

        <div className="mt-12 flex items-center gap-2 text-sm text-white/60">
          <ShieldCheck className="h-4 w-4 text-[color:var(--color-amber)]" />
          Legal tour operator — beroperasi lebih dari 9 tahun di Bali
        </div>
      </div>

      <RidgeDivider color="var(--color-mist)" />
    </section>
  );
}
