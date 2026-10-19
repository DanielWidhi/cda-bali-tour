import { ServiceForm } from "@/components/admin/service-form";
import { createServiceAction } from "../actions";

export default function NewServicePage() {
  return (
    <div>
      <h1 className="font-serif text-2xl mb-1">Tambah Layanan</h1>
      <p className="text-black/50 mb-8">Isi detail layanan baru untuk halaman Our Service.</p>
      <ServiceForm action={createServiceAction} submitLabel="Simpan Layanan" />
    </div>
  );
}
