import { TourForm } from "@/components/admin/tour-form";
import { createTourAction } from "../actions";

export default function NewTourPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl mb-1">Tambah Tour Package</h1>
      <p className="text-black/50 mb-8">Isi detail paket tour baru.</p>
      <TourForm action={createTourAction} submitLabel="Simpan Tour" />
    </div>
  );
}
