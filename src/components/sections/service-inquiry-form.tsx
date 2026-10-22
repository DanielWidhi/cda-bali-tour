"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { User, Globe, MapPin, Navigation, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/config/site";
import { saveInquiryAction } from "@/app/actions/inquiry-actions";

type ServiceInquiryFormProps = {
  serviceTitle: string;
  serviceSlug: string;
  showTransportCta?: boolean;
};

export function ServiceInquiryForm({
  serviceTitle,
  serviceSlug,
  showTransportCta = false,
}: ServiceInquiryFormProps) {
  const t = useTranslations("serviceDetail");

  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [pickup, setPickup] = useState("");
  const [dropPoint, setDropPoint] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const quickPickupOptions = [
    { label: t("quickAirport"), value: "Bandara Ngurah Rai (DPS)" },
    { label: t("quickHotel"), value: "Hotel / Villa" },
    { label: t("quickSanur"), value: "Pelabuhan Sanur" },
  ];

  const quickDropOptions = [
    { label: t("quickUbud"), value: "Ubud" },
    { label: t("quickSeminyak"), value: "Seminyak" },
    { label: t("quickCanggu"), value: "Canggu" },
    { label: t("quickNusaDua"), value: "Nusa Dua" },
    { label: t("quickUluwatu"), value: "Uluwatu" },
  ];

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedName = name.trim();
    const trimmedOrigin = origin.trim();
    const trimmedPickup = pickup.trim();
    const trimmedDrop = dropPoint.trim();

    if (!trimmedName || !trimmedOrigin || !trimmedPickup || !trimmedDrop) {
      setErrorMessage(t("fillAllFields") || "Mohon lengkapi semua data.");
      return;
    }

    setSubmitting(true);

    const messageText = t("waInquiryTemplate", {
      service: serviceTitle,
      name: trimmedName,
      origin: trimmedOrigin,
      pickup: trimmedPickup,
      drop: trimmedDrop,
    });

    // Save lead to inquiries database in the background (does not block user)
    saveInquiryAction({
      name: trimmedName,
      contact: `Asal: ${trimmedOrigin}`,
      message: `Inquiry ${serviceTitle}:\n• Asal: ${trimmedOrigin}\n• Lokasi Jemput: ${trimmedPickup}\n• Lokasi Drop: ${trimmedDrop}`,
      source: `service-${serviceSlug}`,
    }).catch((err) => {
      console.error("Failed to save service inquiry:", err);
    });

    const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(messageText)}`;

    try {
      const win = window.open(waUrl, "_blank", "noopener,noreferrer");
      if (!win || win.closed || typeof win.closed === "undefined") {
        window.location.href = waUrl;
      }
    } catch {
      window.location.href = waUrl;
    }

    setTimeout(() => {
      setSubmitting(false);
    }, 1500);
  }

  return (
    <div
      id="inquiry-form"
      className="sticky top-24 rounded-3xl border border-black/10 bg-white p-6 sm:p-7 shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Header */}
      <div className="mb-5 pb-5 border-b border-black/10">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800 border border-emerald-200/60 mb-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          {t("inquiryBadge")}
        </div>
        <h2 className="font-serif text-2xl text-[color:var(--color-ink)] leading-snug">
          {t("inquiryFormTitle")}
        </h2>
        <p className="mt-1 text-xs text-black/60 leading-relaxed">
          {t("inquiryFormSubtitle")}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Nama */}
        <div>
          <Label htmlFor="inquiry-name" className="text-xs font-semibold flex items-center gap-1.5 mb-1.5 text-black/80">
            <User className="h-3.5 w-3.5 text-[color:var(--color-amber-deep)]" />
            {t("formNameLabel")} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="inquiry-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("formNamePlaceholder")}
            className="text-sm bg-neutral-50/50 border-black/10 focus-visible:bg-white"
          />
        </div>

        {/* Asal */}
        <div>
          <Label htmlFor="inquiry-origin" className="text-xs font-semibold flex items-center gap-1.5 mb-1.5 text-black/80">
            <Globe className="h-3.5 w-3.5 text-[color:var(--color-amber-deep)]" />
            {t("formOriginLabel")} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="inquiry-origin"
            required
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder={t("formOriginPlaceholder")}
            className="text-sm bg-neutral-50/50 border-black/10 focus-visible:bg-white"
          />
        </div>

        {/* Lokasi Jemput */}
        <div>
          <Label htmlFor="inquiry-pickup" className="text-xs font-semibold flex items-center gap-1.5 mb-1.5 text-black/80">
            <MapPin className="h-3.5 w-3.5 text-[color:var(--color-amber-deep)]" />
            {t("formPickupLabel")} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="inquiry-pickup"
            required
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            placeholder={t("formPickupPlaceholder")}
            className="text-sm bg-neutral-50/50 border-black/10 focus-visible:bg-white"
          />
          {/* Quick chips for pickup */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            <span className="text-[11px] text-black/45 inline-flex items-center gap-1">
              <Sparkles className="h-2.5 w-2.5 text-[color:var(--color-amber)]" />
              {t("quickSuggestion")}
            </span>
            {quickPickupOptions.map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => setPickup(opt.value)}
                className={`text-[11px] px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                  pickup === opt.value
                    ? "bg-[color:var(--color-green)] text-white border-transparent"
                    : "bg-black/[0.03] text-black/70 border-black/10 hover:bg-black/[0.08]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lokasi Drop Point */}
        <div>
          <Label htmlFor="inquiry-drop" className="text-xs font-semibold flex items-center gap-1.5 mb-1.5 text-black/80">
            <Navigation className="h-3.5 w-3.5 text-[color:var(--color-amber-deep)]" />
            {t("formDropLabel")} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="inquiry-drop"
            required
            value={dropPoint}
            onChange={(e) => setDropPoint(e.target.value)}
            placeholder={t("formDropPlaceholder")}
            className="text-sm bg-neutral-50/50 border-black/10 focus-visible:bg-white"
          />
          {/* Quick chips for drop-off */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            <span className="text-[11px] text-black/45 inline-flex items-center gap-1">
              <Sparkles className="h-2.5 w-2.5 text-[color:var(--color-amber)]" />
              {t("quickSuggestion")}
            </span>
            {quickDropOptions.map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => setDropPoint(opt.value)}
                className={`text-[11px] px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                  dropPoint === opt.value
                    ? "bg-[color:var(--color-green)] text-white border-transparent"
                    : "bg-black/[0.03] text-black/70 border-black/10 hover:bg-black/[0.08]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {errorMessage && (
          <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
            {errorMessage}
          </p>
        )}

        {/* Submit button: Ask by WhatsApp */}
        <button
          type="submit"
          disabled={submitting}
          className="mt-2 w-full h-12 rounded-full bg-[#25D366] hover:bg-[#20ba5a] active:scale-[0.99] text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-60 cursor-pointer"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current shrink-0" aria-hidden="true">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.42a9.86 9.86 0 0 0 4.62 1.17h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.11c-.24.68-1.4 1.3-1.93 1.36-.5.06-1.05.09-3.02-.63-2.54-.94-4.2-3.44-4.33-3.6-.13-.17-1.03-1.37-1.03-2.62 0-1.25.66-1.86.89-2.11.24-.25.52-.31.7-.31h.5c.16 0 .38-.06.59.45.24.57.8 1.98.87 2.12.07.15.11.32.02.5-.09.19-.14.31-.28.48-.14.16-.29.36-.42.48-.14.13-.28.28-.12.55.16.28.72 1.19 1.55 1.93 1.06.94 1.96 1.24 2.24 1.38.28.14.44.12.6-.07.16-.19.68-.79.86-1.06.18-.28.36-.23.6-.14.24.09 1.53.72 1.79.85.26.13.44.19.5.3.06.11.06.63-.18 1.31Z" />
          </svg>
          <span>{submitting ? t("submitting") : t("askByWhatsapp")}</span>
        </button>
      </form>

      {/* Secondary Actions */}
      <div className="mt-4 flex flex-col gap-2">
        {showTransportCta && (
          <Button asChild size="sm" variant="outline" className="w-full text-xs">
            <Link href="/transport">{t("viewFleet")}</Link>
          </Button>
        )}
        <Button asChild size="sm" variant="ghost" className="w-full text-xs text-black/60 hover:text-black">
          <Link href="/kontak">{t("askFirst")}</Link>
        </Button>
      </div>

      {/* Trust & Guarantee indicators */}
      <div className="mt-5 pt-5 border-t border-black/10 text-xs text-black/60 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-emerald-600 font-bold">✓</span>
          <span>{t("fastResponse")}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-emerald-600 font-bold">✓</span>
          <span>{t("noDeposit")}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-emerald-600 font-bold">✓</span>
          <span>{t("payAfter")}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-emerald-600 font-bold">✓</span>
          <span>{t("directDriver")}</span>
        </div>
      </div>
    </div>
  );
}
