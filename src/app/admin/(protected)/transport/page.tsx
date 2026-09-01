import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatIDR } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteTransportAction } from "./actions";

export default async function AdminTransportPage() {
  const cars = await prisma.transport.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl mb-1">Transport Options</h1>
          <p className="text-black/50">{cars.length} armada</p>
        </div>
        <Button asChild>
          <Link href="/admin/transport/new">
            <Plus className="h-4 w-4" /> Tambah Armada
          </Link>
        </Button>
      </div>

      <div className="rounded-2xl bg-white border border-black/5 overflow-x-auto">
        <table className="w-full min-w-[520px] text-sm">
          <thead>
            <tr className="border-b border-black/5 text-left text-black/50">
              <th className="px-5 py-3 font-medium">Nama</th>
              <th className="px-5 py-3 font-medium">Kapasitas</th>
              <th className="px-5 py-3 font-medium">Harga/Hari</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {cars.map((car) => (
              <tr key={car.id}>
                <td className="px-5 py-3 font-medium">{car.name}</td>
                <td className="px-5 py-3 text-black/60">{car.capacity}</td>
                <td className="px-5 py-3 text-black/60">{formatIDR(car.pricePerDay)}</td>
                <td className="px-5 py-3">
                  <Badge variant={car.published ? "green" : "outline"} className={!car.published ? "border-black/20 text-black/50" : ""}>
                    {car.published ? "Publish" : "Draft"}
                  </Badge>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/transport/${car.id}/edit`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-black/60 hover:bg-black/5 transition-colors"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <DeleteButton itemLabel={car.name} action={deleteTransportAction.bind(null, car.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {cars.length === 0 && (
          <p className="text-center text-black/50 py-10">Belum ada data armada.</p>
        )}
      </div>
    </div>
  );
}
