import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TourForm } from "@/components/admin/tour-form";
import { updateTourAction } from "../../actions";

export default async function EditTourPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tour = await prisma.tourPackage.findUnique({ where: { id } });
  if (!tour) notFound();

  const updateWithId = updateTourAction.bind(null, id);

  return (
    <div>
      <h1 className="font-serif text-2xl mb-1">Edit Tour Package</h1>
      <p className="text-black/50 mb-8">{tour.title}</p>
      <TourForm action={updateWithId} defaultValues={tour} submitLabel="Simpan Perubahan" />
    </div>
  );
}
