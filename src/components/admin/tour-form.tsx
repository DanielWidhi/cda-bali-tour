import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SingleImageUpload, MultiImageUpload } from "@/components/admin/image-upload";
import { BilingualTextarea } from "@/components/admin/bilingual-textarea";
import {
  localizedArrayToLines,
  localizedItineraryToLines,
  localizedFaqToLines,
} from "@/lib/form-parsers";
import type { LocalizedText } from "@/lib/localization";
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
  const shortDesc = defaultValues?.shortDescription as LocalizedText | undefined;
  const desc = defaultValues?.description as LocalizedText | undefined;
  const highlights = localizedArrayToLines(defaultValues?.highlights as LocalizedText[]);
  const includes = localizedArrayToLines(defaultValues?.includes as LocalizedText[]);
  const excludes = localizedArrayToLines(defaultValues?.excludes as LocalizedText[]);
  const itinerary = localizedItineraryToLines(
    defaultValues?.itinerary as Parameters<typeof localizedItineraryToLines>[0]
  );
  const faq = localizedFaqToLines(defaultValues?.faq as Parameters<typeof localizedFaqToLines>[0]);

  return (
    <form action={action} className="flex flex-col gap-6 max-w-3xl">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Judul Tour <span className="text-black/40 font-normal">(1 bahasa — nama produk)</span></Label>
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
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="categoryLabel">Label Kategori (badge)</Label>
          <Input id="categoryLabel" name="categoryLabel" required placeholder="Sunrise Tour" defaultValue={defaultValues?.categoryLabel} />
        </div>
      </div>

      <div>
        <Label htmlFor="location">Lokasi <span className="text-black/40 font-normal">(1 bahasa)</span></Label>
        <Input id="location" name="location" required defaultValue={defaultValues?.location} />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="durationHours">Durasi (jam)</Label>
          <Input id="durationHours" name="durationHours" type="number" min={1} required defaultValue={defaultValues?.durationHours ?? 5} />
          <p className="text-xs text-black/40 mt-1">Cukup angka — label &ldquo;jam&rdquo;/&ldquo;hours&rdquo; otomatis</p>
        </div>
        <div>
          <Label htmlFor="price">Harga (IDR)</Label>
          <Input id="price" name="price" type="number" required min={0} defaultValue={defaultValues?.price} />
        </div>
        <div>
          <Label htmlFor="originalPrice">Harga Coret (opsional)</Label>
          <Input id="originalPrice" name="originalPrice" type="number" min={0} defaultValue={defaultValues?.originalPrice ?? ""} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="rating">Rating</Label>
          <Input id="rating" name="rating" type="number" step="0.1" min={0} max={5} defaultValue={defaultValues?.rating ?? 5} />
        </div>
        <div>
          <Label htmlFor="reviewCount">Jumlah Ulasan</Label>
          <Input id="reviewCount" name="reviewCount" type="number" min={0} defaultValue={defaultValues?.reviewCount ?? 0} />
        </div>
      </div>

      <div>
        <Label>Gambar Cover</Label>
        <SingleImageUpload name="coverImage" folder="tours" defaultValue={defaultValues?.coverImage} />
      </div>

      <div>
        <Label>Galeri</Label>
        <MultiImageUpload name="gallery" folder="tours" defaultValue={defaultValues?.gallery ?? []} />
      </div>

      <hr className="border-black/10" />
      <p className="text-sm text-black/50 -mb-2">
        Field di bawah ini bilingual — isi tab 🇮🇩 ID dulu, tab 🇬🇧 EN boleh menyusul (fallback otomatis ke ID kalau kosong).
      </p>

      <BilingualTextarea
        label="Deskripsi Singkat"
        idName="shortDescriptionId"
        enName="shortDescriptionEn"
        defaultId={shortDesc?.id}
        defaultEn={shortDesc?.en}
      />

      <BilingualTextarea
        label="Deskripsi Lengkap"
        idName="descriptionId"
        enName="descriptionEn"
        defaultId={desc?.id}
        defaultEn={desc?.en}
        className="min-h-40"
      />

      <BilingualTextarea
        label="Highlight Perjalanan (1 poin per baris)"
        idName="highlightsId"
        enName="highlightsEn"
        defaultId={highlights.id}
        defaultEn={highlights.en}
        className="min-h-28"
      />

      <BilingualTextarea
        label="Itinerary"
        hint={'Format tab ID: "05.30 - Aktivitas" (1 per baris). Tab EN cukup teks aktivitasnya saja, urutan baris harus sama dengan tab ID.'}
        idName="itineraryId"
        enName="itineraryEn"
        defaultId={itinerary.id}
        defaultEn={itinerary.en}
        className="min-h-32"
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <BilingualTextarea
          label="Termasuk (1 per baris)"
          idName="includesId"
          enName="includesEn"
          defaultId={includes.id}
          defaultEn={includes.en}
          className="min-h-28"
        />
        <BilingualTextarea
          label="Tidak Termasuk (1 per baris)"
          idName="excludesId"
          enName="excludesEn"
          defaultId={excludes.id}
          defaultEn={excludes.en}
          className="min-h-28"
        />
      </div>

      <BilingualTextarea
        label="FAQ"
        hint='Format: "Pertanyaan :: Jawaban" (1 per baris), urutan harus sama di kedua tab.'
        idName="faqId"
        enName="faqEn"
        defaultId={faq.id}
        defaultEn={faq.en}
        className="min-h-28"
      />

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="published"
          defaultChecked={defaultValues?.published ?? true}
          className="h-4 w-4 rounded border-black/20"
        />
        Publish (tampilkan di website)
      </label>

      <Button type="submit" size="lg" className="self-start">{submitLabel}</Button>
    </form>
  );
}
