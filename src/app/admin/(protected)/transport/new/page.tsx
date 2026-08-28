import { TransportForm } from "@/components/admin/transport-form";
import { createTransportAction } from "../actions";

export default function NewTransportPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl mb-1">Tambah Armada</h1>
      <p className="text-black/50 mb-8">Isi detail kendaraan baru.</p>
      <TransportForm action={createTransportAction} submitLabel="Simpan Armada" />
    </div>
  );
}
