import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/current-profile";
import { UserForm } from "@/components/admin/user-form";
import { createUserAction } from "../actions";

export default async function NewUserPage() {
  const profile = await getCurrentProfile();
  if (profile?.role !== "SUPERADMIN") {
    redirect("/admin/users");
  }

  return (
    <div>
      <h1 className="font-serif text-2xl mb-1">Tambah Admin</h1>
      <p className="text-black/50 mb-8">Buat akun login baru untuk tim kamu.</p>
      <UserForm action={createUserAction} submitLabel="Buat Akun" />
    </div>
  );
}
