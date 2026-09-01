import Link from "next/link";
import { Plus, Pencil, ShieldCheck, UserCog } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCurrentProfile } from "@/lib/current-profile";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteUserAction } from "./actions";

export default async function AdminUsersPage() {
  const currentProfile = await getCurrentProfile();
  const isSuperadmin = currentProfile?.role === "SUPERADMIN";

  const users = await prisma.profile.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl mb-1">Users</h1>
          <p className="text-black/50">
            {users.length} akun admin
            {!isSuperadmin && " — hanya Super Admin yang bisa menambah/mengedit/menghapus akun"}
          </p>
        </div>
        {isSuperadmin && (
          <Button asChild>
            <Link href="/admin/users/new">
              <Plus className="h-4 w-4" /> Tambah Admin
            </Link>
          </Button>
        )}
      </div>

      <div className="rounded-2xl bg-white border border-black/5 overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[500px]">
          <thead>
            <tr className="border-b border-black/5 text-left text-black/50">
              <th className="px-5 py-3 font-medium">Nama</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Role</th>
              {isSuperadmin && <th className="px-5 py-3 font-medium text-right">Aksi</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-5 py-3 font-medium">
                  {user.name}
                  {user.id === currentProfile?.id && (
                    <span className="text-xs text-black/40 font-normal"> (kamu)</span>
                  )}
                </td>
                <td className="px-5 py-3 text-black/60">{user.email}</td>
                <td className="px-5 py-3">
                  <Badge
                    variant={user.role === "SUPERADMIN" ? "default" : "outline"}
                    className={
                      user.role === "SUPERADMIN"
                        ? "gap-1"
                        : "gap-1 border-black/15 text-black/50"
                    }
                  >
                    {user.role === "SUPERADMIN" ? (
                      <ShieldCheck className="h-3 w-3" />
                    ) : (
                      <UserCog className="h-3 w-3" />
                    )}
                    {user.role === "SUPERADMIN" ? "Super Admin" : "Admin"}
                  </Badge>
                </td>
                {isSuperadmin && (
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/users/${user.id}/edit`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-black/60 hover:bg-black/5 transition-colors"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      {user.id !== currentProfile?.id && (
                        <DeleteButton
                          itemLabel={user.name}
                          action={deleteUserAction.bind(null, user.id)}
                        />
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
