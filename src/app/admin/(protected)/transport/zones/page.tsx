import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BilingualTextarea } from "@/components/admin/bilingual-textarea";
import { SingleImageUpload } from "@/components/admin/image-upload";
import { ZONE_NUMBERS } from "@/lib/zones";
import type { LocalizedText } from "@/lib/localization";
import { saveZonesAction } from "./actions";

export default async function AdminTransportZonesPage() {
  const zones = await prisma.transportZone.findMany();
  const byNumber = new Map(zones.map((z) => [z.number, z]));

  return (
    <div>
      <Link
        href="/admin/transport"
        className="inline-flex items-center gap-1.5 text-sm text-black/50 hover:text-black mb-4"
      >
        <ArrowLeft className="h-4 w-4" /> Kembali ke Transport
      </Link>
      <h1 className="font-serif text-2xl mb-1">Zona Transport</h1>
      <p className="text-black/50 mb-8 max-w-2xl">
        Ada 4 zona. Isi daerah apa saja yang masuk tiap zona dan (opsional) foto zonanya. Harga per zona diisi di
        form masing-masing armada.
      </p>

      <form action={saveZonesAction} className="flex flex-col gap-6 max-w-3xl">
        {ZONE_NUMBERS.map((n) => {
          const zone = byNumber.get(n);
          const desc = zone?.description as LocalizedText | undefined;
          return (
            <div key={n} className="rounded-2xl bg-white border border-black/5 p-6 flex flex-col gap-4">
              <h2 className="font-serif text-lg">Zona {n}</h2>
              <BilingualTextarea
                label="Deskripsi / daerah yang tercakup"
                hint="Contoh: Kuta, Seminyak, Canggu, Sanur, Jimbaran."
                idName={`desc${n}Id`}
                enName={`desc${n}En`}
                defaultId={desc?.id}
                defaultEn={desc?.en}
                className="min-h-24"
              />
              <div>
                <Label>Foto zona (opsional)</Label>
                <SingleImageUpload name={`image${n}`} folder="zones" defaultValue={zone?.image ?? ""} />
              </div>
            </div>
          );
        })}
        <Button type="submit" size="lg" className="self-start">
          Simpan Zona
        </Button>
      </form>
    </div>
  );
}
