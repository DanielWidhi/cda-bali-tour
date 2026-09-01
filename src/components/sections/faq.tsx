import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection() {
  const t = useTranslations("faq");
  // next-intl mengizinkan ambil array langsung dari messages via t.raw()
  const items = t.raw("items") as { question: string; answer: string }[];

  return (
    <section className="mx-auto max-w-3xl px-5 lg:px-8 py-20" data-aos="fade-up">
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-amber-deep)]">
          {t("label")}
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl mt-3">{t("title")}</h2>
      </div>
      <Accordion type="single" collapsible>
        {items.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
