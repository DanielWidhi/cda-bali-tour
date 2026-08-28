import Link from "next/link";
import { Plus, Pencil, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatIDR } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteTourAction } from "./actions";

export default async function AdminToursPage() {
  const tours = await prisma.tourPackage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl mb-1">Tour Packages</h1>
          <p className="text-black/50">{tours.length} paket tour</p>
        </div>
        <Button asChild>
          <Link href="/admin/tours/new">
            <Plus className="h-4 w-4" /> Tambah Tour
          </Link>
        </Button>
      </div>

      <div className="rounded-2xl bg-white border border-black/5 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/5 text-left text-black/50">
              <th className="px-5 py-3 font-medium">Nama</th>
              <th className="px-5 py-3 font-medium">Kategori</th>
              <th className="px-5 py-3 font-medium">Harga</th>
              <th className="px-5 py-3 font-medium">Rating</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {tours.map((tour) => (
              <tr key={tour.id}>
                <td className="px-5 py-3">
                  <p className="font-medium">{tour.title}</p>
                  <p className="text-xs text-black/40">/{tour.slug}</p>
                </td>
                <td className="px-5 py-3 text-black/60">{tour.categoryLabel}</td>
                <td className="px-5 py-3 text-black/60">{formatIDR(tour.price)}</td>
                <td className="px-5 py-3 text-black/60">
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-[color:var(--color-amber)] text-[color:var(--color-amber)]" />
                    {tour.rating}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <Badge variant={tour.published ? "green" : "outline"} className={!tour.published ? "border-black/20 text-black/50" : ""}>
                    {tour.published ? "Publish" : "Draft"}
                  </Badge>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/tours/${tour.id}/edit`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-black/60 hover:bg-black/5 transition-colors"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <DeleteButton
                      itemLabel={tour.title}
                      action={deleteTourAction.bind(null, tour.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {tours.length === 0 && (
          <p className="text-center text-black/50 py-10">
            Belum ada tour package. Klik &ldquo;Tambah Tour&rdquo; untuk membuat yang pertama.
          </p>
        )}
      </div>
    </div>
  );
}
