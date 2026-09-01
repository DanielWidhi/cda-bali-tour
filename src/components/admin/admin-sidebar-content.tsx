import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { adminNavItems } from "@/lib/admin-nav";
import { logoutAction } from "@/app/admin/actions-auth";

export function AdminSidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <Link href="/admin" onClick={onNavigate} className="flex items-center gap-2 mb-8 shrink-0">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--color-amber)] text-[color:var(--color-ink)] font-serif text-lg">
          C
        </span>
        <span className="font-serif text-white text-base">CDA Admin</span>
      </Link>

      <nav className="flex flex-col gap-1 flex-1 overflow-y-auto min-h-0">
        {adminNavItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-white/10 transition-colors shrink-0"
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="flex flex-col gap-1 pt-4 border-t border-white/10 shrink-0">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-white/10 transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          Lihat Website
        </a>
        <form action={logoutAction}>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-white/10 transition-colors">
            <LogOut className="h-4 w-4" />
            Keluar
          </button>
        </form>
      </div>
    </>
  );
}
