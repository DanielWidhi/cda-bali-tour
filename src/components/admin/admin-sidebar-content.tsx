import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  MapPinned,
  Car,
  Images,
  Star,
  MessageSquareText,
  Users,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { logoutAction } from "@/app/admin/actions-auth";

export const adminNavItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/tours", label: "Tour Packages", icon: MapPinned },
  { href: "/admin/transport", label: "Transport", icon: Car },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquareText },
  { href: "/admin/users", label: "Users", icon: Users },
];

export function AdminSidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <Link href="/admin" className="flex items-center gap-2 mb-8 shrink-0" onClick={onNavigate}>
        <Image
          src="/images/icon/cda-logo.webp"
          alt="CDA Logo"
          width={36}
          height={36}
          className="rounded-full"
        />
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

      {/* Selalu terlihat, tidak ikut ter-scroll bersama nav di atas */}
      <div className="flex flex-col gap-1 pt-4 mt-4 border-t border-white/10 shrink-0">
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
    </div>
  );
}
