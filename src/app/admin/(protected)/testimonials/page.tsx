import { Star, Phone } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { createTestimonialAction, deleteTestimonialAction } from "./actions";
import { PublishToggle } from "./publish-toggle";

function TestimonialCard({
  t,
}: {
  t: {
    id: string;
    name: string;
    origin: string;
    phone: string | null;
    rating: number;
    quote: string;
    tourSlug: string | null;
    published: boolean;
  };
}) {
  return (
    <div className="rounded-2xl bg-white border border-black/5 p-5">
      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex items-center gap-1 text-[color:var(--color-amber)]">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-current" />
          ))}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <PublishToggle id={t.id} published={t.published} />
          <DeleteButton itemLabel={t.name} action={deleteTestimonialAction.bind(null, t.id)} />
        </div>
      </div>
      <p className="text-sm text-black/70 mb-2">&ldquo;{t.quote}&rdquo;</p>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-black/50">
        <span className="font-medium text-black">{t.name}</span>
        <span>{t.origin}</span>
        {t.phone && (
          <span className="flex items-center gap-1">
            <Phone className="h-3 w-3" /> {t.phone}
          </span>
        )}
        {t.tourSlug && <Badge variant="outline" className="border-black/15 text-black/50">{t.tourSlug}</Badge>}
      </div>
    </div>
  );
}

export default async function AdminTestimonialsPage() {
  const all = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  const pending = all.filter((t) => !t.published);
  const published = all.filter((t) => t.published);

  return (
    <div>
      <h1 className="font-serif text-2xl mb-1">Testimonials</h1>
      <p className="text-black/50 mb-8">
        {published.length} tayang di homepage · {pending.length} menunggu approval
      </p>

      <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8">
        <form action={createTestimonialAction} className="rounded-2xl bg-white border border-black/5 p-6 flex flex-col gap-4 h-fit">
          <h2 className="font-serif text-lg">Tambah Testimoni Manual</h2>
          <p className="text-xs text-black/50 -mt-2">Testimoni yang kamu input di sini langsung tayang.</p>
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
            <Input id="tourSlug" name="tourSlug" placeholder="sunrise-mount-batur-jeep" />
          </div>
          <div>
            <Label htmlFor="quote">Isi Testimoni</Label>
            <Textarea id="quote" name="quote" required />
          </div>
          <Button type="submit" className="self-start">Simpan & Tayangkan</Button>
        </form>

        <div className="flex flex-col gap-8">
          {pending.length > 0 && (
            <div>
              <h2 className="font-serif text-lg mb-3 flex items-center gap-2">
                Menunggu Approval
                <Badge variant="default">{pending.length}</Badge>
              </h2>
              <div className="flex flex-col gap-3">
                {pending.map((t) => (
                  <TestimonialCard key={t.id} t={t} />
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="font-serif text-lg mb-3">Sudah Tayang</h2>
            <div className="flex flex-col gap-3">
              {published.map((t) => (
                <TestimonialCard key={t.id} t={t} />
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
