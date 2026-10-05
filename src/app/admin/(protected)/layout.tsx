import { Suspense } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { ToastHandler } from "@/components/admin/toast-handler";
import { getCurrentProfile } from "@/lib/current-profile";
import { prisma } from "@/lib/prisma";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentProfile();
  const unreadInquiryCount = await prisma.inquiry.count({
    where: { status: { in: ["NEW", "IN_PROGRESS"] } },
  });

  return (
    <AdminShell
      profile={profile ? { name: profile.name, role: profile.role } : null}
      unreadInquiryCount={unreadInquiryCount}
    >
      <Suspense fallback={null}>
        <ToastHandler />
      </Suspense>
      {children}
    </AdminShell>
  );
}
