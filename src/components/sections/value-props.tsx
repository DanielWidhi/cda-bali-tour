import { Car, Sunrise, Compass, Wallet } from "lucide-react";

const items = [
  {
    icon: Car,
    title: "Kendaraan Pribadi",
    description: "Setiap trip eksklusif untuk grup Anda — tidak digabung wisatawan lain.",
  },
  {
    icon: Sunrise,
    title: "Spesialis Sunrise",
    description: "Kami tahu jam & titik terbaik untuk sunrise Gunung Batur dan lokasi lainnya.",
  },
  {
    icon: Compass,
    title: "Driver Lokal Berpengalaman",
    description: "Lahir & besar di Bali — hafal setiap jalur, dari jalan utama hingga pintasan.",
  },
  {
    icon: Wallet,
    title: "Harga Transparan",
    description: "Booking tanpa DP, bayar setelah trip, tanpa biaya tersembunyi.",
  },
];

export function ValueProps() {
  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-8 -mt-14 relative z-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgba(20,23,26,0.08)] border border-black/5"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--color-amber)]/15 text-[color:var(--color-amber-deep)] mb-4">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-base mb-1.5">{title}</h3>
            <p className="text-sm text-black/60 leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
