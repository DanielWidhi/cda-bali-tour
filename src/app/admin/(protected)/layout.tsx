import { prisma } from "@/lib/prisma";
import { getCurrentProfile } from "@/lib/current-profile";
import { AdminShell } from "@/components/admin/admin-shell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const profile = await getCurrentProfile();

  const unreadInquiryCount = await prisma.inquiry.count({
    where: { status: { in: ["NEW", "IN_PROGRESS"] } },
  });

  return (
    <AdminShell
      profile={profile ? { name: profile.name, role: profile.role } : null}
      unreadInquiryCount={unreadInquiryCount}
    >
      {children}
    </AdminShell>
  );
}
