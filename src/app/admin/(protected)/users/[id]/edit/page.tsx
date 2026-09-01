import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentProfile } from "@/lib/current-profile";
import { UserForm } from "@/components/admin/user-form";
import { updateUserAction } from "../../actions";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const currentProfile = await getCurrentProfile();

  if (currentProfile?.role !== "SUPERADMIN") {
    redirect("/admin/users");
  }

  const user = await prisma.profile.findUnique({ where: { id } });
  if (!user) notFound();

  const updateWithId = updateUserAction.bind(null, id);
  const isSelf = currentProfile.id === user.id;

  return (
    <div>
      <h1 className="font-serif text-2xl mb-1">Edit Admin</h1>
      <p className="text-black/50 mb-8">{user.name}</p>
      <UserForm
        action={updateWithId}
        defaultValues={{ email: user.email, name: user.name, role: user.role }}
        submitLabel="Simpan Perubahan"
        isSelf={isSelf}
      />
    </div>
  );
}
