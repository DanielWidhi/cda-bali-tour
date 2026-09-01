import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { updateSession } from "@/lib/supabase/middleware";

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Route /admin/* -> tidak pakai locale, cukup proteksi Supabase Auth
  if (pathname.startsWith("/admin")) {
    const { response, user } = await updateSession(request);
    const isLoginPage = pathname === "/admin/login";

    if (!isLoginPage && !user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    if (isLoginPage && user) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return response;
  }

  // Semua halaman publik lain -> ditangani next-intl (deteksi/redirect locale)
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
