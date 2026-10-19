import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ServiceForm } from "@/components/admin/service-form";
import { updateServiceAction } from "../../actions";
import { resolveText, type LocalizedText } from "@/lib/localization";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) notFound();

  const updateWithId = updateServiceAction.bind(null, id);

  return (
    <div>
      <h1 className="font-serif text-2xl mb-1">Edit Layanan</h1>
      <p className="text-black/50 mb-8">{resolveText(service.title as LocalizedText, "id")}</p>
      <ServiceForm action={updateWithId} defaultValues={service} submitLabel="Simpan Perubahan" />
    </div>
  );
}
