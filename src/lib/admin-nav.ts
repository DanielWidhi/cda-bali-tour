import {
  LayoutDashboard,
  MapPinned,
  Car,
  Images,
  Star,
  MessageSquareText,
  Users,
} from "lucide-react";

export const adminNavItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/tours", label: "Tour Packages", icon: MapPinned },
  { href: "/admin/transport", label: "Transport", icon: Car },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquareText },
  { href: "/admin/users", label: "Users", icon: Users },
];
