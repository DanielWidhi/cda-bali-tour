"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MapPin, Phone, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { LanguageSwitcher } from "@/components/layout/language-switcher";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.6h2.6l.4-3H13.5V8.4c0-.87.24-1.46 1.5-1.46H16.6V4.28C16.3 4.24 15.3 4.15 14.13 4.15c-2.4 0-4.04 1.46-4.04 4.15v2.3H7.5v3h2.6V21h3.4Z" />
    </svg>
  );
}

export function Footer() {
  const t = useTranslations();

  const footerColumns = [
    {
      title: t("nav.tourPackages"),
      links: [
        { label: t("nav.sunriseTour"), href: "/tour?category=sunrise" },
        { label: t("nav.dayTour"), href: "/tour?category=day-tour" },
        { label: t("nav.nusaPenida"), href: "/tour?category=nusa-penida" },
        { label: t("nav.adventure"), href: "/tour?category=adventure" },
      ],
    },
    {
      title: t("footer.services"),
      links: [
        { label: t("footer.carRental"), href: "/transport" },
        { label: t("nav.gallery"), href: "/gallery" },
        { label: t("nav.aboutUs"), href: "/tentang-kami" },
        { label: t("nav.contact"), href: "/kontak" },
      ],
    },
  ];

  return (
    <footer className="bg-[color:var(--color-ink)] text-white/80">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--color-amber)] text-[color:var(--color-ink)] font-serif text-lg">
              C
            </span>
            <span className="font-serif text-lg text-white">
              {siteConfig.brandName}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-white/60">
            {siteConfig.description}
          </p>
          <div className="flex gap-3 mt-5">
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        {footerColumns.map((col) => (
          <div key={col.title}>
            <h4 className="font-serif text-base text-white mb-4">{col.title}</h4>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="font-serif text-base text-white mb-4">{t("footer.contact")}</h4>
          <ul className="flex flex-col gap-3 text-sm text-white/60 mb-5">
            <li className="flex gap-2.5">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{siteConfig.address}</span>
            </li>
            <li className="flex gap-2.5">
              <Phone className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{siteConfig.phone}</span>
            </li>
            <li className="flex gap-2.5">
              <Mail className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{siteConfig.email}</span>
            </li>
          </ul>
          <LanguageSwitcher className="[&_svg]:text-white/40 [&_button]:text-white/60" />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-5 flex flex-col sm:flex-row gap-2 items-center justify-between text-xs text-white/40">
          <p>
            © {new Date().getFullYear()} {siteConfig.companyLegalName} — {siteConfig.brandName}.{" "}
            {t("footer.rightsReserved")}
          </p>
          <p>
            {t("footer.publishedBy")}{" "}
            <a
              href={siteConfig.developer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors underline underline-offset-2"
            >
              {siteConfig.developer.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
