import Link from "next/link";
import { MapPinned, Car, MessageSquareText, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [tourCount, transportCount, testimonialCount, newInquiryCount] =
    await Promise.all([
      prisma.tourPackage.count(),
      prisma.transport.count(),
      prisma.testimonial.count(),
      prisma.inquiry.count({ where: { status: "NEW" } }),
    ]);

  const cards = [
    { label: "Tour Packages", value: tourCount, href: "/admin/tours", icon: MapPinned },
    { label: "Transport Options", value: transportCount, href: "/admin/transport", icon: Car },
    { label: "Testimonials", value: testimonialCount, href: "/admin/testimonials", icon: Star },
    { label: "Inquiry Baru", value: newInquiryCount, href: "/admin/inquiries", icon: MessageSquareText },
  ];

  const recentInquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <div>
      <h1 className="font-serif text-2xl mb-1">Dashboard</h1>
      <p className="text-black/50 mb-8">Ringkasan konten website CDA Bali Tour.</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        {cards.map(({ label, value, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="rounded-2xl bg-white border border-black/5 p-5 hover:shadow-md transition-shadow"
          >
            <Icon className="h-5 w-5 text-[color:var(--color-amber-deep)] mb-3" />
            <p className="text-2xl font-serif">{value}</p>
            <p className="text-sm text-black/50">{label}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl bg-white border border-black/5 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-lg">Inquiry Terbaru</h2>
          <Link href="/admin/inquiries" className="text-sm text-[color:var(--color-amber-deep)] hover:underline">
            Lihat semua
          </Link>
        </div>
        {recentInquiries.length === 0 ? (
          <p className="text-sm text-black/50">Belum ada inquiry masuk.</p>
        ) : (
          <ul className="flex flex-col divide-y divide-black/5">
            {recentInquiries.map((inq) => (
              <li key={inq.id} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{inq.name}</p>
                  <p className="text-xs text-black/50 truncate">{inq.message}</p>
                </div>
                <span className="text-xs text-black/40 shrink-0">
                  {new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(inq.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
