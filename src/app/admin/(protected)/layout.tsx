import Link from "next/link";
import {
  LayoutDashboard,
  MapPinned,
  Car,
  MessageSquareText,
  Star,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { logoutAction } from "../actions-auth";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/tours", label: "Tour Packages", icon: MapPinned },
  { href: "/admin/transport", label: "Transport", icon: Car },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquareText },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[color:var(--color-mist)]">
      <aside className="hidden md:flex w-64 shrink-0 flex-col bg-[color:var(--color-ink)] text-white/80 p-5">
        <Link href="/admin" className="flex items-center gap-2 mb-8">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--color-amber)] text-[color:var(--color-ink)] font-serif text-lg">
            C
          </span>
          <span className="font-serif text-white text-base">CDA Admin</span>
        </Link>

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-white/10 transition-colors"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-1 pt-4 border-t border-white/10">
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
      </aside>

      <main className="flex-1 min-w-0 p-6 lg:p-10">{children}</main>
    </div>
  );
}
