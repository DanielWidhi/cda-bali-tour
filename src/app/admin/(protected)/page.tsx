import Link from "next/link";
import { MapPinned, Car, MessageSquareText, Star, Images, Users } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [
    tourCount,
    transportCount,
    testimonialCount,
    pendingTestimonialCount,
    galleryCount,
    userCount,
    newInquiryCount,
  ] = await Promise.all([
    prisma.tourPackage.count(),
    prisma.transport.count(),
    prisma.testimonial.count({ where: { published: true } }),
    prisma.testimonial.count({ where: { published: false } }),
    prisma.galleryImage.count(),
    prisma.profile.count(),
    prisma.inquiry.count({ where: { status: { in: ["NEW", "IN_PROGRESS"] } } }),
  ]);

  const cards = [
    { label: "Tour Packages", value: tourCount, href: "/admin/tours", icon: MapPinned },
    { label: "Transport Options", value: transportCount, href: "/admin/transport", icon: Car },
    { label: "Gallery Photos", value: galleryCount, href: "/admin/gallery", icon: Images },
    {
      label: "Testimonials",
      value: testimonialCount,
      href: "/admin/testimonials",
      icon: Star,
      badge: pendingTestimonialCount > 0 ? `${pendingTestimonialCount} menunggu` : undefined,
    },
    { label: "Inquiry Belum Selesai", value: newInquiryCount, href: "/admin/inquiries", icon: MessageSquareText },
    { label: "Admin Users", value: userCount, href: "/admin/users", icon: Users },
  ];

  const recentInquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <div>
      <h1 className="font-serif text-2xl mb-1">Dashboard</h1>
      <p className="text-black/50 mb-8">Ringkasan konten website CDA Bali Tour.</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        {cards.map(({ label, value, href, icon: Icon, badge }) => (
          <Link
            key={label}
            href={href}
            className="rounded-2xl bg-white border border-black/5 p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <Icon className="h-5 w-5 text-[color:var(--color-amber-deep)] mb-3" />
              {badge && (
                <span className="rounded-full bg-amber-100 text-amber-700 text-[11px] font-semibold px-2 py-0.5">
                  {badge}
                </span>
              )}
            </div>
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
