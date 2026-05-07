import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
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
