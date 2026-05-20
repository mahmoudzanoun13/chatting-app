import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthCookie } from "@/lib/auth";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Remove locale prefix
  const pathnameWithoutLocale = pathname.replace(/^\/(en|ar)/, "");

  const isProtectedRoute =
    pathnameWithoutLocale.startsWith("/chat");

  const isAuthRoute =
    pathnameWithoutLocale.startsWith("/login") ||
    pathnameWithoutLocale.startsWith("/signup") ||
    pathnameWithoutLocale.startsWith("/forgot-password");

  const user = verifyAuthCookie(request);

  // Block unauthenticated users
  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Prevent logged-in users from opening auth pages
  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  // If the user visits the root of a locale, redirect to /chat
  if (pathname === '/en' || pathname === '/ar') {
    return NextResponse.redirect(new URL(`${pathname}/chat`, request.url));
  }

  const handleMiddleware = createMiddleware(routing);
  return handleMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
