import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Check, X } from "lucide-react";
import { Link, redirect } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GalleryLightbox } from "@/components/sections/gallery-lightbox";
import { prisma } from "@/lib/prisma";
import {
  resolveText,
  resolveArray,
  resolveFaq,
  type Locale,
  type LocalizedText,
  type LocalizedFaqItem,
} from "@/lib/localization";
import { siteConfig } from "@/config/site";

export const revalidate = 60;

export async function generateStaticParams() {
  const services = await prisma.service.findMany({ where: { published: true }, select: { slug: true } });
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const service = await prisma.service.findUnique({ where: { slug } });
  if (!service) return {};
  const title = resolveText(service.title as LocalizedText, locale as Locale);
  const description = resolveText(service.shortDescription as LocalizedText, locale as Locale);
  return {
    title,
    description: description || undefined,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title, description: description || undefined, images: service.coverImage ? [{ url: service.coverImage }] : undefined },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale: rawLocale } = await params;
  const locale = rawLocale as Locale;

  const service = await prisma.service.findUnique({ where: { slug } });
  if (!service || !service.published) notFound();

  // Layanan yang punya halaman sendiri (mis. Day Trip -> /tour) langsung diarahkan ke sana
  if (service.linkHref) redirect({ href: service.linkHref, locale });

  const t = await getTranslations("serviceDetail");
  const title = resolveText(service.title as LocalizedText, locale);
  const description = resolveText(service.description as LocalizedText, locale);
  const highlights = resolveArray(service.highlights as LocalizedText[], locale);
  const includes = resolveArray(service.includes as LocalizedText[], locale);
  const excludes = resolveArray(service.excludes as LocalizedText[], locale);
  const faq = resolveFaq(service.faq as LocalizedFaqItem[], locale);
  const gallery = service.gallery.map((url) => ({ url, caption: title }));

  const waLink = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(t("waMessage", { service: title }))}`;

  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8 py-10">
      <nav className="text-xs text-black/50 mb-6">
        <Link href="/">{t("home")}</Link> / <Link href="/services">{t("breadcrumb")}</Link> /{" "}
        <span className="text-black/80">{title}</span>
      </nav>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2" data-aos="fade-up">
          <h1 className="font-serif text-3xl sm:text-4xl leading-tight">{title}</h1>

          {service.coverImage && (
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mt-6">
              <Image
                src={service.coverImage}
                alt={title}
                fill
                priority
                quality={75}
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
              />
            </div>
          )}

          {description && (
            <section className="mt-8">
              <p className="text-black/70 leading-relaxed whitespace-pre-line">{description}</p>
            </section>
          )}

          {highlights.length > 0 && (
            <section className="mt-10">
              <h2 className="font-serif text-2xl mb-4">{t("highlights")}</h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-sm text-black/70">
                    <Check className="h-4 w-4 text-[color:var(--color-green)] shrink-0 mt-0.5" />
                    {h}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {(includes.length > 0 || excludes.length > 0) && (
            <section className="mt-10 grid sm:grid-cols-2 gap-8">
              {includes.length > 0 && (
                <div>
                  <h3 className="font-serif text-xl mb-3">{t("includes")}</h3>
                  <ul className="flex flex-col gap-2">
                    {includes.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-black/70">
                        <Check className="h-4 w-4 text-[color:var(--color-green)] shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {excludes.length > 0 && (
                <div>
                  <h3 className="font-serif text-xl mb-3">{t("excludes")}</h3>
                  <ul className="flex flex-col gap-2">
                    {excludes.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-black/70">
                        <X className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {gallery.length > 0 && (
            <section className="mt-10">
              <h2 className="font-serif text-2xl">{t("photos")}</h2>
              <div className="-mt-6">
                <GalleryLightbox images={gallery} />
              </div>
            </section>
          )}

          {faq.length > 0 && (
            <section className="mt-10">
              <h2 className="font-serif text-2xl mb-2">{t("faq")}</h2>
              <Accordion type="single" collapsible>
                {faq.map((f, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger>{f.question}</AccordionTrigger>
                    <AccordionContent>{f.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          )}
        </div>

        <aside className="lg:col-span-1" data-aos="fade-up" data-aos-delay="150">
          <div className="sticky top-24 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
            <Button asChild size="lg" className="w-full mb-3">
              <a href={waLink} target="_blank" rel="noopener noreferrer">
                {t("bookWhatsapp")}
              </a>
            </Button>
            {service.showTransportCta && (
              <Button asChild size="lg" variant="outline" className="w-full mb-3">
                <Link href="/transport">{t("viewFleet")}</Link>
              </Button>
            )}
            <Button asChild size="lg" variant="outline" className="w-full">
              <Link href="/kontak">{t("askFirst")}</Link>
            </Button>

            <div className="mt-6 pt-6 border-t border-black/10 text-xs text-black/50 flex flex-col gap-1.5">
              <span>✓ {t("noDeposit")}</span>
              <span>✓ {t("payAfter")}</span>
              <span>✓ {t("freeCancel")}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
