"use client";

import { useState, useTransition, FormEvent } from "react";
import { useTranslations } from "next-intl";
import Swal from "sweetalert2";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { StarRatingInput } from "@/components/ui/star-rating-input";
import { submitTestimonialAction } from "@/app/[locale]/testimoni/actions";

export function TestimonialForm({
  tourOptions,
}: {
  tourOptions: { slug: string; title: string }[];
}) {
  const t = useTranslations("testimoniPage");
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [phone, setPhone] = useState("");
  const [rating, setRating] = useState(5);
  const [tourSlug, setTourSlug] = useState("");
  const [quote, setQuote] = useState("");
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    startTransition(async () => {
      const result = await submitTestimonialAction({
        name,
        origin,
        phone,
        rating,
        tourSlug: tourSlug || undefined,
        quote,
      });

      if (result.ok) {
        await Swal.fire({
          title: t("successTitle"),
          text: t("successText"),
          icon: "success",
          confirmButtonColor: "#b5601c",
        });
        setName("");
        setOrigin("");
        setPhone("");
        setRating(5);
        setTourSlug("");
        setQuote("");
      } else {
        await Swal.fire({
          title: t("errorTitle"),
          text: result.error ?? t("errorDefault"),
          icon: "error",
          confirmButtonColor: "#b5601c",
        });
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" data-aos="fade-up">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="name">{t("nameLabel")}</Label>
          <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="origin">{t("originLabel")}</Label>
          <Input
            id="origin"
            required
            placeholder={t("originPlaceholder")}
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="phone">{t("phoneLabel")}</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+62..."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="tourSlug">{t("tourLabel")}</Label>
          <select
            id="tourSlug"
            value={tourSlug}
            onChange={(e) => setTourSlug(e.target.value)}
            className="flex h-11 w-full rounded-xl border border-black/15 bg-white px-4 text-sm outline-none focus-visible:border-[color:var(--color-amber)] focus-visible:ring-2 focus-visible:ring-[color:var(--color-amber)]/20"
          >
            <option value="">{t("tourPlaceholder")}</option>
            {tourOptions.map((tour) => (
              <option key={tour.slug} value={tour.slug}>
                {tour.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <Label>{t("ratingLabel")}</Label>
        <StarRatingInput value={rating} onChange={setRating} />
      </div>

      <div>
        <Label htmlFor="quote">{t("quoteLabel")}</Label>
        <Textarea
          id="quote"
          required
          className="min-h-32"
          placeholder={t("quotePlaceholder")}
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
        />
      </div>

      <Button type="submit" size="lg" className="self-start" disabled={pending}>
        {pending ? t("sending") : t("send")}
      </Button>
    </form>
  );
}
