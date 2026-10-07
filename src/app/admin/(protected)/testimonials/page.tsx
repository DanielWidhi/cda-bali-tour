import { Star, Phone } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/delete-button";
import { WhatsAppLinkButton } from "@/components/admin/whatsapp-link-button";
import { createTestimonialAction, deleteTestimonialAction, acceptAllPendingTestimonialsAction } from "./actions";
import { PublishToggle } from "./publish-toggle";

function TestimonialCard({
  t,
  tourTitle,
}: {
  t: {
    id: string;
    name: string;
    origin: string;
    phone: string | null;
    rating: number;
    quote: string;
    published: boolean;
    tourSlug?: string | null;
  };
  tourTitle?: string | null;
}) {
// removed internal DB fetch, title passed as prop

  return (
    <div className="rounded-2xl bg-white border border-black/5 p-5 flex items-start justify-between gap-4">
      <div className="min-w-0">
        <div className="flex items-center gap-1 text-[color:var(--color-amber)] mb-1.5">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-current" />
          ))}
        </div>
        <p className="text-sm text-black/70 mb-2">&ldquo;{t.quote}&rdquo;</p>
        <p className="text-xs font-medium">
          {t.name} — {t.origin}
        </p>
        {tourTitle && (
  <p className="text-xs text-black/70">Tour: {tourTitle}</p>
)}
{t.phone && (
  <p className="text-xs text-black/50 flex items-center gap-1 mt-0.5">
    <Phone className="h-3 w-3" /> {t.phone}
  </p>
)}
      </div>
      <div className="flex flex-col items-end gap-2 shrink-0">
        <PublishToggle id={t.id} published={t.published} />
        <div className="flex items-center gap-1">
          <WhatsAppLinkButton phone={t.phone} />
          <DeleteButton itemLabel={t.name} action={deleteTestimonialAction.bind(null, t.id)} />
        </div>
      </div>
    </div>
  );
}

export default async function AdminTestimonialsPage() {
  const allTestimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  const testimonialsWithTitle = await Promise.all(
    allTestimonials.map(async (t) => {
      const title = t.tourSlug
        ? await prisma.tourPackage
            .findUnique({ where: { slug: t.tourSlug }, select: { title: true } })
            .then(res => res?.title)
        : null;
      return { ...t, tourTitle: title };
    })
  );

  const pending = testimonialsWithTitle.filter((t) => !t.published);
  const published = testimonialsWithTitle.filter((t) => t.published);

  return (
    <div>
      <h1 className="font-serif text-2xl mb-1">Testimonials</h1>
      <p className="text-black/50 mb-8">
        {published.length} tayang di homepage · {pending.length} menunggu approval
      </p>

      <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8">
        <form
          action={createTestimonialAction}
          className="rounded-2xl bg-white border border-black/5 p-6 flex flex-col gap-4 h-fit"
        >
          <h2 className="font-serif text-lg">Tambah Testimoni Manual</h2>
          <p className="text-xs text-black/50 -mt-2">
            Testimoni yang ditambahkan dari sini langsung tayang tanpa approval.
          </p>
          <div>
            <Label htmlFor="name">Nama</Label>
            <Input id="name" name="name" required />
          </div>
          <div>
            <Label htmlFor="origin">Asal (negara/kota)</Label>
            <Input id="origin" name="origin" required placeholder="Australia" />
          </div>
          <div>
            <Label htmlFor="phone">No. Telp (opsional)</Label>
            <Input id="phone" name="phone" placeholder="+62..." />
          </div>
          <div>
            <Label htmlFor="rating">Rating (1-5)</Label>
            <Input id="rating" name="rating" type="number" min={1} max={5} defaultValue={5} />
          </div>
          <div>
            <Label htmlFor="tourSlug">Slug Tour Terkait (opsional)</Label>
            <select
              id="tourSlug"
              name="tourSlug"
              className="flex h-11 w-full rounded-xl border border-black/15 bg-white px-4 text-sm outline-none focus-visible:border-[color:var(--color-amber)] focus-visible:ring-2 focus-visible:ring-[color:var(--color-amber)]/20"
            >
              <option value="">Tidak ada</option>
              {await prisma.tourPackage.findMany({ where: { published: true }, select: { slug: true, title: true } }).then(tours => tours.map(t => (
                <option key={t.slug} value={t.slug}>{t.title}</option>
              )))}
            </select>
          </div>
          <div>
            <Label htmlFor="quote">Isi Testimoni</Label>
            <Textarea id="quote" name="quote" required />
          </div>
          <Button type="submit" className="self-start">Simpan Testimoni</Button>
        </form>

        <div className="flex flex-col gap-8">
          {pending.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h2 className="font-serif text-lg mb-0 flex items-center gap-2">
                  Menunggu Approval
                  <span className="rounded-full bg-amber-100 text-amber-700 text-xs font-semibold px-2.5 py-0.5">
                    {pending.length}
                  </span>
                </h2>
                <Button type="button" onClick={acceptAllPendingTestimonialsAction} className="ml-auto self-start">
                  Accept All
                </Button>
              </div>
              <div className="flex flex-col gap-3 max-h-96 overflow-y-auto pr-2">
                {pending.map((t) => (
                  <TestimonialCard key={t.id} t={t} tourTitle={t.tourTitle} />
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="font-serif text-lg mb-3">Sudah Tayang</h2>
            <div className="flex flex-col gap-3 max-h-96 overflow-y-auto pr-2">
              {published.map((t) => (
                <TestimonialCard key={t.id} t={t} tourTitle={t.tourTitle} />
              ))}
              {published.length === 0 && (
                <p className="text-sm text-black/50">Belum ada testimoni yang tayang.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
