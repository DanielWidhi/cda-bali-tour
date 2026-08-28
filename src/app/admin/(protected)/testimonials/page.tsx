import { Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/delete-button";
import { createTestimonialAction, deleteTestimonialAction } from "./actions";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-serif text-2xl mb-1">Testimonials</h1>
      <p className="text-black/50 mb-8">{testimonials.length} testimoni ditampilkan di homepage.</p>

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8">
        <form action={createTestimonialAction} className="rounded-2xl bg-white border border-black/5 p-6 flex flex-col gap-4 h-fit">
          <h2 className="font-serif text-lg">Tambah Testimoni</h2>
          <div>
            <Label htmlFor="name">Nama</Label>
            <Input id="name" name="name" required />
          </div>
          <div>
            <Label htmlFor="origin">Asal (negara/kota)</Label>
            <Input id="origin" name="origin" required placeholder="Australia" />
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
          <Button type="submit" className="self-start">Simpan Testimoni</Button>
        </form>

        <div className="flex flex-col gap-3">
          {testimonials.map((t) => (
            <div key={t.id} className="rounded-2xl bg-white border border-black/5 p-5 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-1 text-[color:var(--color-amber)] mb-1.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-black/70 mb-2">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-xs font-medium">{t.name} — {t.origin}</p>
              </div>
              <DeleteButton itemLabel={t.name} action={deleteTestimonialAction.bind(null, t.id)} />
            </div>
          ))}
          {testimonials.length === 0 && (
            <p className="text-sm text-black/50">Belum ada testimoni.</p>
          )}
        </div>
      </div>
    </div>
  );
}
