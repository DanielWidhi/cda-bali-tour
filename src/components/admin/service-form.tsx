import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SingleImageUpload, MultiImageUpload } from "@/components/admin/image-upload";
import { BilingualTextarea } from "@/components/admin/bilingual-textarea";
import { localizedArrayToLines, localizedFaqToLines } from "@/lib/form-parsers";
import type { LocalizedText } from "@/lib/localization";
import type { Service } from "@prisma/client";

export function ServiceForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaultValues?: Service;
  submitLabel: string;
}) {
  const isEdit = Boolean(defaultValues);
  const title = defaultValues?.title as LocalizedText | undefined;
  const shortDesc = defaultValues?.shortDescription as LocalizedText | undefined;
  const desc = defaultValues?.description as LocalizedText | undefined;
  const highlights = localizedArrayToLines(defaultValues?.highlights as LocalizedText[]);
  const includes = localizedArrayToLines(defaultValues?.includes as LocalizedText[]);
  const excludes = localizedArrayToLines(defaultValues?.excludes as LocalizedText[]);
  const faq = localizedFaqToLines(defaultValues?.faq as Parameters<typeof localizedFaqToLines>[0]);

  return (
    <form action={action} className="flex flex-col gap-6 max-w-3xl">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="slug">Slug (URL)</Label>
          <Input
            id="slug"
            name="slug"
            required
            readOnly={isEdit}
            pattern="[a-z0-9\-]+"
            title="Hanya huruf kecil, angka, dan tanda strip"
            placeholder="airport-transfer"
            defaultValue={defaultValues?.slug}
            className={isEdit ? "opacity-60" : ""}
          />
          <p className="text-xs text-black/40 mt-1">
            {isEdit
              ? "Slug tidak bisa diubah karena dipakai menu & link website."
              : "Dipakai di alamat halaman: /services/slug-ini"}
          </p>
        </div>
        <div>
          <Label htmlFor="sortOrder">Urutan tampil</Label>
          <Input id="sortOrder" name="sortOrder" type="number" defaultValue={defaultValues?.sortOrder ?? 0} />
          <p className="text-xs text-black/40 mt-1">Angka kecil tampil lebih dulu.</p>
        </div>
      </div>

      <div>
        <Label>Gambar Cover</Label>
        <SingleImageUpload name="coverImage" folder="services" defaultValue={defaultValues?.coverImage ?? ""} />
        <p className="text-xs text-black/40 mt-1">Opsional — kalau kosong, kartu layanan memakai tampilan polos.</p>
      </div>

      <div>
        <Label>Galeri</Label>
        <MultiImageUpload name="gallery" folder="services" defaultValue={defaultValues?.gallery ?? []} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="linkHref">Link tujuan (opsional)</Label>
          <Input
            id="linkHref"
            name="linkHref"
            placeholder="/tour?category=day-tour"
            defaultValue={defaultValues?.linkHref ?? ""}
          />
          <p className="text-xs text-black/40 mt-1">
            Isi kalau layanan ini sudah punya halaman sendiri (mis. /tour atau /transport) — kartu akan langsung ke
            sana, bukan ke halaman detail layanan. Harus diawali &ldquo;/&rdquo;.
          </p>
        </div>
        <label className="flex items-start gap-2 text-sm sm:mt-7">
          <input
            type="checkbox"
            name="showTransportCta"
            defaultChecked={defaultValues?.showTransportCta ?? false}
            className="h-4 w-4 rounded border-black/20 mt-0.5"
          />
          <span>
            Tampilkan tombol &ldquo;Lihat Armada &amp; Harga Zona&rdquo;
            <span className="block text-xs text-black/40">Cocok untuk Rent Car, Airport Transfer, Hotel Transfer.</span>
          </span>
        </label>
      </div>

      <hr className="border-black/10" />
      <p className="text-sm text-black/50 -mb-2">
        Field di bawah ini bilingual — isi tab 🇮🇩 ID dulu, tab 🇬🇧 EN boleh menyusul (fallback otomatis ke ID kalau kosong).
      </p>

      <BilingualTextarea
        label="Nama Layanan"
        idName="titleId"
        enName="titleEn"
        defaultId={title?.id}
        defaultEn={title?.en}
        className="min-h-14"
      />
      <BilingualTextarea
        label="Deskripsi Singkat"
        hint="Tampil di kartu pada halaman Our Service."
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
        label="Highlight (1 poin per baris)"
        idName="highlightsId"
        enName="highlightsEn"
        defaultId={highlights.id}
        defaultEn={highlights.en}
        className="min-h-28"
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

      <Button type="submit" size="lg" className="self-start">
        {submitLabel}
      </Button>
    </form>
  );
}
