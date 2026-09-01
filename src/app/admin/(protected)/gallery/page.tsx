import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MultiImageUpload } from "@/components/admin/image-upload";
import { DeleteButton } from "@/components/admin/delete-button";
import { createGalleryImagesAction, deleteGalleryImageAction } from "./actions";

export default async function AdminGalleryPage() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-serif text-2xl mb-1">Gallery</h1>
      <p className="text-black/50 mb-8">{images.length} foto tampil di halaman Gallery website.</p>

      <form
        action={createGalleryImagesAction}
        className="rounded-2xl bg-white border border-black/5 p-6 flex flex-col gap-4 mb-8"
      >
        <h2 className="font-serif text-lg">Upload Foto Baru</h2>
        <MultiImageUpload name="images" folder="gallery" />
        <div className="max-w-sm">
          <Label htmlFor="caption">Keterangan (opsional, berlaku untuk semua foto di atas)</Label>
          <Input id="caption" name="caption" placeholder="Sunrise Mount Batur" />
        </div>
        <Button type="submit" className="self-start">Simpan ke Gallery</Button>
      </form>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {images.map((img) => (
          <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden group">
            <Image src={img.url} alt={img.caption ?? ""} fill className="object-cover" />
            <div className="absolute top-1.5 right-1.5 rounded-full bg-white/90 shadow-sm">
              <DeleteButton
                itemLabel={img.caption ?? "foto ini"}
                action={deleteGalleryImageAction.bind(null, img.id)}
              />
            </div>
          </div>
        ))}
        {images.length === 0 && (
          <p className="col-span-full text-sm text-black/50">Belum ada foto di gallery.</p>
        )}
      </div>
    </div>
  );
}
