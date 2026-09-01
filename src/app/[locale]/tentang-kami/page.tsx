import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ShieldCheck, Users, Clock3 } from "lucide-react";
import { siteConfig } from "@/config/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("aboutPage");
  return {
    title: t("label"),
    description: t("paragraph1", { company: siteConfig.companyLegalName }),
    alternates: { canonical: "/tentang-kami" },
  };
}

export default async function AboutPage() {
  const t = await getTranslations("aboutPage");

  const stats = [
    { icon: Clock3, label: t("statYears") },
    { icon: Users, label: t("statTravelers") },
    { icon: ShieldCheck, label: t("statLegal") },
  ];

  return (
    <div className="mx-auto max-w-5xl px-5 lg:px-8 py-16">
      <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-amber-deep)]">
        {t("label")}
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl mt-3 max-w-2xl">{t("title")}</h1>

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
        <p>{t("paragraph1", { company: siteConfig.companyLegalName })}</p>
        <p>{t("paragraph2")}</p>
        <p>{t("paragraph3")}</p>
      </div>
    </div>
  );
}
