import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SingleImageUpload, MultiImageUpload } from "@/components/admin/image-upload";
import { BilingualTextarea } from "@/components/admin/bilingual-textarea";
import { ZONE_NUMBERS } from "@/lib/zones";
import type { LocalizedText } from "@/lib/localization";
import type { Prisma } from "@prisma/client";

// Armada + harga per zona (zonePrices) — dipakai untuk mengisi form saat edit
export type TransportFormValues = Prisma.TransportGetPayload<{
  include: { zonePrices: { include: { zone: true } } };
}>;

export function TransportForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaultValues?: TransportFormValues;
  submitLabel: string;
}) {
  const description = defaultValues?.description as LocalizedText | undefined;
  const luggage = defaultValues?.luggage as LocalizedText | undefined;
  const zonePriceByNumber = new Map((defaultValues?.zonePrices ?? []).map((zp) => [zp.zone.number, zp]));

  return (
    <form action={action} className="flex flex-col gap-5 max-w-xl">
      <div>
        <Label htmlFor="name">Nama Kendaraan</Label>
        <Input id="name" name="name" required defaultValue={defaultValues?.name} />
      </div>
      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" name="slug" required pattern="[a-z0-9-]+" placeholder="toyota-hiace" defaultValue={defaultValues?.slug} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="capacityMin">Kapasitas Min</Label>
          <Input id="capacityMin" name="capacityMin" type="number" min={1} required defaultValue={defaultValues?.capacityMin ?? 4} />
        </div>
        <div>
          <Label htmlFor="capacityMax">Kapasitas Max</Label>
          <Input id="capacityMax" name="capacityMax" type="number" min={1} required defaultValue={defaultValues?.capacityMax ?? 5} />
        </div>
      </div>
      <p className="text-xs text-black/40 -mt-3">Cukup angka — label &ldquo;orang&rdquo;/&ldquo;people&rdquo; otomatis mengikuti bahasa</p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="pricePerDay">Harga per Hari (IDR)</Label>
          <Input id="pricePerDay" name="pricePerDay" type="number" min={0} required defaultValue={defaultValues?.pricePerDay} />
        </div>
        <div>
          <Label htmlFor="hours">Durasi (jam)</Label>
          <Input id="hours" name="hours" type="number" min={1} required defaultValue={defaultValues?.hours ?? 10} />
        </div>
      </div>

      <div className="-mt-1">
        <Label htmlFor="pricePerDayUsd">Harga per Hari (USD)</Label>
        <Input id="pricePerDayUsd" name="pricePerDayUsd" type="number" min={0} defaultValue={defaultValues?.pricePerDayUsd ?? ""} />
        <p className="text-xs text-black/40 mt-1">Tampil saat pengunjung memakai bahasa English. Kosongkan → pengunjung EN melihat harga IDR.</p>
      </div>

      <div>
        <Label>Gambar Kendaraan</Label>
        <SingleImageUpload name="image" folder="transport" defaultValue={defaultValues?.image} />
      </div>

      <div>
        <Label>Galeri Foto Kendaraan</Label>
        <p className="text-xs text-black/40 mb-1.5">Disarankan 3-4 foto: tampak luar, dalam kabin, dan area bagasi.</p>
        <MultiImageUpload name="gallery" folder="transport" defaultValue={defaultValues?.gallery ?? []} />
      </div>

      <hr className="border-black/10" />
      <p className="text-sm text-black/50 -mb-2">
        Field di bawah ini bilingual — isi tab 🇮🇩 ID dulu, tab 🇬🇧 EN boleh menyusul (fallback otomatis ke ID kalau kosong).
      </p>

      <BilingualTextarea
        label="Deskripsi Kendaraan"
        idName="descriptionId"
        enName="descriptionEn"
        defaultId={description?.id}
        defaultEn={description?.en}
        className="min-h-28"
      />
      <BilingualTextarea
        label="Bagasi"
        hint="Contoh: 3 koper besar + 2 tas kabin."
        idName="luggageId"
        enName="luggageEn"
        defaultId={luggage?.id}
        defaultEn={luggage?.en}
        className="min-h-16"
      />

      <hr className="border-black/10" />
      <div>
        <p className="font-medium text-sm mb-1">Harga per Zona</p>
        <p className="text-xs text-black/40 mb-3">
          Kosongkan kolom IDR kalau zona itu tidak ditawarkan untuk armada ini. USD opsional (kosong → pengunjung EN
          melihat harga IDR). Deskripsi daerah tiap zona diatur di menu <strong>Kelola Zona</strong>.
        </p>
        <div className="flex flex-col gap-3">
          {ZONE_NUMBERS.map((n) => {
            const zp = zonePriceByNumber.get(n);
            return (
              <div key={n} className="grid grid-cols-[4.5rem_1fr_1fr] items-center gap-3">
                <span className="text-sm font-medium">Zona {n}</span>
                <Input name={`zone${n}Idr`} type="number" min={0} placeholder="Harga IDR" defaultValue={zp?.priceIdr ?? ""} aria-label={`Harga zona ${n} (IDR)`} />
                <Input name={`zone${n}Usd`} type="number" min={0} placeholder="Harga USD" defaultValue={zp?.priceUsd ?? ""} aria-label={`Harga zona ${n} (USD)`} />
              </div>
            );
          })}
        </div>
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

      <Button type="submit" size="lg" className="self-start">{submitLabel}</Button>
    </form>
  );
}
