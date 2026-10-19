import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { resolveText, type LocalizedText } from "@/lib/localization";
import { deleteServiceAction } from "./actions";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="font-serif text-2xl mb-1">Services</h1>
          <p className="text-black/50">{services.length} layanan di halaman Our Service</p>
        </div>
        <Button asChild>
          <Link href="/admin/services/new">
            <Plus className="h-4 w-4" /> Tambah Layanan
          </Link>
        </Button>
      </div>
      <p className="text-xs text-black/40 mb-8 max-w-2xl">
        Catatan: layanan yang ada di menu navbar (rent-car, airport-transfer, hotel-transfer, couple-package,
        honeymoon-package, activity-organizer) sebaiknya tidak dihapus atau di-draft, karena link di menu akan menjadi
        halaman &ldquo;tidak ditemukan&rdquo;.
      </p>

      <div className="rounded-2xl bg-white border border-black/5 overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[560px]">
          <thead>
            <tr className="border-b border-black/5 text-left text-black/50">
              <th className="px-5 py-3 font-medium">Layanan</th>
              <th className="px-5 py-3 font-medium">Tujuan kartu</th>
              <th className="px-5 py-3 font-medium">Urutan</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {services.map((s) => {
              const title = resolveText(s.title as LocalizedText, "id");
              return (
                <tr key={s.id}>
                  <td className="px-5 py-3">
                    <p className="font-medium">{title}</p>
                    <p className="text-xs text-black/40">/{s.slug}</p>
                  </td>
                  <td className="px-5 py-3 text-black/60">{s.linkHref ? s.linkHref : "Halaman detail"}</td>
                  <td className="px-5 py-3 text-black/60">{s.sortOrder}</td>
                  <td className="px-5 py-3">
                    <Badge
                      variant={s.published ? "green" : "outline"}
                      className={!s.published ? "border-black/20 text-black/50" : ""}
                    >
                      {s.published ? "Publish" : "Draft"}
                    </Badge>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/services/${s.id}/edit`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-black/60 hover:bg-black/5 transition-colors"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <DeleteButton itemLabel={title} action={deleteServiceAction.bind(null, s.id)} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {services.length === 0 && (
          <p className="text-center text-black/50 py-10">
            Belum ada layanan. Klik &ldquo;Tambah Layanan&rdquo; untuk membuat yang pertama.
          </p>
        )}
      </div>
    </div>
  );
}
