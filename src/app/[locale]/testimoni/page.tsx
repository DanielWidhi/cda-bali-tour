import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { TestimonialForm } from "@/components/sections/testimonial-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("testimoniPage");
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: "/testimoni" },
  };
}

export default async function TestimoniPage() {
  const t = await getTranslations("testimoniPage");
  const tours = await prisma.tourPackage.findMany({
    where: { published: true },
    select: { slug: true, title: true },
    orderBy: { title: "asc" },
  });

  return (
    <div className="mx-auto max-w-2xl px-5 lg:px-8 py-16">
      <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-amber-deep)]">
        {t("label")}
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl mt-3">{t("title")}</h1>
      <p className="text-black/60 mt-3">{t("description")}</p>

      <div className="mt-10">
        <TestimonialForm tourOptions={tours} />
      </div>
    </div>
  );
}
