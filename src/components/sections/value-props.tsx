import { useTranslations } from "next-intl";
import { Car, Sunrise, Compass, Wallet } from "lucide-react";

const iconMap = [Car, Sunrise, Compass, Wallet];
const keys = ["privateVehicle", "sunrise", "driver", "price"] as const;

export function ValueProps() {
  const t = useTranslations("valueProps");

  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-8 -mt-14 relative z-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {keys.map((key, i) => {
          const Icon = iconMap[i];
          return (
            <div
              key={key}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgba(20,23,26,0.08)] border border-black/5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--color-amber)]/15 text-[color:var(--color-amber-deep)] mb-4">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-base mb-1.5">{t(`${key}Title`)}</h3>
              <p className="text-sm text-black/60 leading-relaxed">{t(`${key}Desc`)}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
