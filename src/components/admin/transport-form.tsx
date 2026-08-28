import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
        <Input
          id="slug"
          name="slug"
          required
          pattern="[a-z0-9-]+"
          placeholder="toyota-hiace"
          defaultValue={defaultValues?.slug}
        />
      </div>
      <div>
        <Label htmlFor="capacity">Kapasitas</Label>
        <Input id="capacity" name="capacity" required placeholder="4-5 orang" defaultValue={defaultValues?.capacity} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="pricePerDay">Harga per Hari (IDR)</Label>
          <Input
            id="pricePerDay"
            name="pricePerDay"
            type="number"
            min={0}
            required
            defaultValue={defaultValues?.pricePerDay}
          />
        </div>
        <div>
          <Label htmlFor="hours">Durasi (jam)</Label>
          <Input id="hours" name="hours" type="number" min={1} required defaultValue={defaultValues?.hours ?? 10} />
        </div>
      </div>
      <div>
        <Label htmlFor="image">URL Gambar</Label>
        <Input id="image" name="image" required defaultValue={defaultValues?.image} />
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

      <Button type="submit" size="lg" className="self-start">
        {submitLabel}
      </Button>
    </form>
  );
}
