import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function CtaBanner() {
  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-8 pb-20">
      <div className="rounded-3xl bg-[color:var(--color-green)] text-white px-8 py-14 sm:px-14 flex flex-col lg:flex-row items-center justify-between gap-8" data-aos="fade-up">
        <div className="max-w-xl text-center lg:text-left">
          <h2 className="font-serif text-3xl sm:text-4xl leading-tight">
            Sudah tahu mau ke mana? Mari susun rencana perjalanan Anda.
          </h2>
          <p className="mt-3 text-white/70">
            Chat langsung dengan tim kami di WhatsApp — respon cepat, tanpa
            perantara.
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild size="lg">
            <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer">
              Chat WhatsApp
            </a>
          </Button>
          <Button asChild size="lg" variant="inverse">
            <Link href="/tour">Lihat Paket</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
