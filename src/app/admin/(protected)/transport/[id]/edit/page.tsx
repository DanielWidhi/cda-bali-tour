import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TransportForm } from "@/components/admin/transport-form";
import { updateTransportAction } from "../../actions";

export default async function EditTransportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = await prisma.transport.findUnique({ where: { id } });
  if (!car) notFound();

  const updateWithId = updateTransportAction.bind(null, id);

  return (
    <div>
      <h1 className="font-serif text-2xl mb-1">Edit Armada</h1>
      <p className="text-black/50 mb-8">{car.name}</p>
      <TransportForm action={updateWithId} defaultValues={car} submitLabel="Simpan Perubahan" />
    </div>
  );
}
