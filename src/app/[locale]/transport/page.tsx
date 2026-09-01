import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { transportIncludes, transportExcludes } from "@/data/transport";
import { formatIDR } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("transportPage");
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/transport" },
  };
}

export default async function TransportPage() {
  const t = await getTranslations("transportPage");
  const transportOptions = await prisma.transport.findMany({
    where: { published: true },
    orderBy: { pricePerDay: "asc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16">
      <div className="max-w-2xl mb-12" data-aos="fade-up">
        <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-amber-deep)]">
          {t("label")}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl mt-3">{t("title")}</h1>
        <p className="text-black/60 mt-3 leading-relaxed">{t("description")}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-16">
        {transportOptions.map((car, i) => (
          <div key={car.slug} data-aos="fade-up" data-aos-delay={(i % 4) * 100}>
            <Card>
              <div className="relative aspect-[4/3]">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                />
              </div>
              <CardContent className="pt-4 flex-1">
                <h3 className="font-serif text-lg">{car.name}</h3>
                <p className="text-sm text-black/50 mt-1">{car.capacity}</p>
              </CardContent>
              <CardFooter className="flex-col items-start gap-3 border-t border-black/5 pt-4">
                <div>
                  <p className="font-serif text-xl text-[color:var(--color-amber-deep)]">
                    {formatIDR(car.pricePerDay)}
                  </p>
                  <p className="text-xs text-black/50">
                    / {car.hours} {t("perHour")}
                  </p>
                </div>
                <Button asChild size="sm" className="w-full">
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                      `Halo, saya ingin sewa mobil ${car.name}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("book")}
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
        {transportOptions.length === 0 && (
          <p className="col-span-full text-black/50">{t("noData")}</p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-8 max-w-3xl">
        <div>
          <h3 className="font-serif text-xl mb-3">{t("includes")}</h3>
          <ul className="flex flex-col gap-2">
            {transportIncludes.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-black/70">
                <Check className="h-4 w-4 text-[color:var(--color-green)] shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-serif text-xl mb-3">{t("excludes")}</h3>
          <ul className="flex flex-col gap-2">
            {transportExcludes.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-black/70">
                <X className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
