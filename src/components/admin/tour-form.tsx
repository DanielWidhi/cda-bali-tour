import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SingleImageUpload, MultiImageUpload } from "@/components/admin/image-upload";
import {
  arrayToLines,
  itineraryToText,
  faqToText,
} from "@/lib/form-parsers";
import type { TourPackage as PrismaTourPackage } from "@prisma/client";

const categoryOptions = [
  { value: "sunrise", label: "Sunrise / Sunset Tour" },
  { value: "day-tour", label: "Day Tour" },
  { value: "nusa-penida", label: "Nusa Penida" },
  { value: "adventure", label: "Adventure" },
  { value: "honeymoon", label: "Honeymoon" },
  { value: "water-sport", label: "Water Sport" },
];

export function TourForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaultValues?: PrismaTourPackage;
  submitLabel: string;
}) {
  const itinerary = (defaultValues?.itinerary as { time: string; activity: string }[]) ?? [];
  const faq = (defaultValues?.faq as { question: string; answer: string }[]) ?? [];

  return (
    <form action={action} className="flex flex-col gap-6 max-w-3xl">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Judul Tour</Label>
          <Input id="title" name="title" required defaultValue={defaultValues?.title} />
        </div>
        <div>
          <Label htmlFor="slug">Slug (URL)</Label>
          <Input
            id="slug"
            name="slug"
            required
            pattern="[a-z0-9-]+"
            title="Hanya huruf kecil, angka, dan tanda strip"
            placeholder="sunrise-mount-batur-jeep"
            defaultValue={defaultValues?.slug}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Kategori</Label>
          <select
            id="category"
            name="category"
            required
            defaultValue={defaultValues?.category ?? categoryOptions[0].value}
            className="flex h-11 w-full rounded-xl border border-black/15 bg-white px-4 text-sm outline-none focus-visible:border-[color:var(--color-amber)] focus-visible:ring-2 focus-visible:ring-[color:var(--color-amber)]/20"
          >
            {categoryOptions.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="categoryLabel">Label Kategori (ditampilkan di badge)</Label>
          <Input
            id="categoryLabel"
            name="categoryLabel"
            required
            placeholder="Sunrise Tour"
            defaultValue={defaultValues?.categoryLabel}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="location">Lokasi</Label>
          <Input id="location" name="location" required defaultValue={defaultValues?.location} />
        </div>
        <div>
          <Label htmlFor="duration">Durasi</Label>
          <Input id="duration" name="duration" required placeholder="5 jam" defaultValue={defaultValues?.duration} />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="price">Harga (IDR)</Label>
          <Input id="price" name="price" type="number" required min={0} defaultValue={defaultValues?.price} />
        </div>
        <div>
          <Label htmlFor="originalPrice">Harga Coret (opsional)</Label>
          <Input
            id="originalPrice"
            name="originalPrice"
            type="number"
            min={0}
            defaultValue={defaultValues?.originalPrice ?? ""}
          />
        </div>
        <div>
          <Label htmlFor="rating">Rating</Label>
          <Input
            id="rating"
            name="rating"
            type="number"
            step="0.1"
            min={0}
            max={5}
            defaultValue={defaultValues?.rating ?? 5}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="reviewCount">Jumlah Ulasan</Label>
        <Input
          id="reviewCount"
          name="reviewCount"
          type="number"
          min={0}
          className="max-w-40"
          defaultValue={defaultValues?.reviewCount ?? 0}
        />
      </div>

      <div>
        <Label htmlFor="coverImage">Gambar Cover</Label>
        <SingleImageUpload
          name="coverImage"
          folder="tours"
          defaultValue={defaultValues?.coverImage}
        />
      </div>

      <div>
        <Label htmlFor="gallery">Galeri</Label>
        <MultiImageUpload
          name="gallery"
          folder="tours"
          defaultValue={defaultValues?.gallery ?? []}
        />
      </div>

      <div>
        <Label htmlFor="shortDescription">Deskripsi Singkat (untuk card)</Label>
        <Textarea
          id="shortDescription"
          name="shortDescription"
          required
          defaultValue={defaultValues?.shortDescription}
        />
      </div>

      <div>
        <Label htmlFor="description">Deskripsi Lengkap</Label>
        <Textarea
          id="description"
          name="description"
          required
          className="min-h-40"
          defaultValue={defaultValues?.description}
        />
      </div>

      <div>
        <Label htmlFor="highlights">Highlight Perjalanan (1 poin per baris)</Label>
        <Textarea
          id="highlights"
          name="highlights"
          className="min-h-28"
          defaultValue={arrayToLines(defaultValues?.highlights ?? [])}
        />
      </div>

      <div>
        <Label htmlFor="itinerary">
          Itinerary — format: <code className="text-xs bg-black/5 px-1 rounded">05.30 - Aktivitas</code> (1 per baris)
        </Label>
        <Textarea
          id="itinerary"
          name="itinerary"
          className="min-h-32"
          defaultValue={itineraryToText(itinerary)}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="includes">Termasuk (1 per baris)</Label>
          <Textarea id="includes" name="includes" className="min-h-28" defaultValue={arrayToLines(defaultValues?.includes ?? [])} />
        </div>
        <div>
          <Label htmlFor="excludes">Tidak Termasuk (1 per baris)</Label>
          <Textarea id="excludes" name="excludes" className="min-h-28" defaultValue={arrayToLines(defaultValues?.excludes ?? [])} />
        </div>
      </div>

      <div>
        <Label htmlFor="faq">
          FAQ — format: <code className="text-xs bg-black/5 px-1 rounded">Pertanyaan :: Jawaban</code> (1 per baris)
        </Label>
        <Textarea id="faq" name="faq" className="min-h-28" defaultValue={faqToText(faq)} />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="published"
          defaultChecked={defaultValues?.published ?? true}
          className="h-4 w-4 rounded border-black/20"
        />
        Publish (tampilkan di website)
      </label>

      <div className="flex gap-3">
        <Button type="submit" size="lg">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
