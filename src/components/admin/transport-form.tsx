import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SingleImageUpload } from "@/components/admin/image-upload";
import type { Transport } from "@prisma/client";

export function TransportForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaultValues?: Transport;
  submitLabel: string;
}) {
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

      <div>
        <Label>Gambar Kendaraan</Label>
        <SingleImageUpload name="image" folder="transport" defaultValue={defaultValues?.image} />
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
