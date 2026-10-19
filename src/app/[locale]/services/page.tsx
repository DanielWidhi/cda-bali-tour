import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowRight, ConciergeBell } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { resolveText, type Locale, type LocalizedText } from "@/lib/localization";
import { siteConfig } from "@/config/site";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("servicesPage");
  return { title: t("title"), description: t("description"), alternates: { canonical: "/services" } };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = await getTranslations("servicesPage");

  const services = await prisma.service.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16">
      <div className="max-w-2xl mb-12" data-aos="fade-up">
        <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-amber-deep)]">{t("label")}</span>
        <h1 className="font-serif text-3xl sm:text-4xl mt-3">{t("title")}</h1>
        <p className="text-black/60 mt-3 leading-relaxed">{t("description")}</p>
      </div>

      {services.length === 0 ? (
        <p className="text-black/50">{t("empty")}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const title = resolveText(service.title as LocalizedText, locale);
            const short = resolveText(service.shortDescription as LocalizedText, locale);
            const href = service.linkHref ?? `/services/${service.slug}`;
            return (
              <Link
                key={service.id}
                href={href}
                data-aos="fade-up"
                data-aos-delay={(i % 3) * 100}
                className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {service.coverImage ? (
                    <Image
                      src={service.coverImage}
                      alt={title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={70}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--color-ink)] to-[color:var(--color-green)] flex items-center justify-center">
                      <ConciergeBell className="h-12 w-12 text-white/30" />
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="font-serif text-lg leading-snug group-hover:text-[color:var(--color-amber-deep)] transition-colors">
                    {title}
                  </h2>
                  {short && <p className="mt-2 text-sm text-black/60 leading-relaxed line-clamp-3">{short}</p>}
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[color:var(--color-amber-deep)]">
                    {t("learnMore")} <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <div
        className="mt-16 rounded-3xl bg-[color:var(--color-green)] text-white px-8 py-12 sm:px-14 flex flex-col lg:flex-row items-center justify-between gap-6"
        data-aos="fade-up"
      >
        <div className="max-w-xl text-center lg:text-left">
          <h2 className="font-serif text-2xl sm:text-3xl leading-tight">{t("ctaTitle")}</h2>
          <p className="mt-2 text-white/70">{t("ctaText")}</p>
        </div>
        <Button asChild size="lg" className="w-full sm:w-auto">
          <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer">
            {t("ctaButton")}
          </a>
        </Button>
      </div>
    </div>
  );
}
