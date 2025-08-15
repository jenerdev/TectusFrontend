import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Routes that require authentication.
 * Keep these in sync with `config.matcher` for performance.
 */
const protectedRoutes = [
  '/dashboard',
  '/submit-info',
  '/verify-email',
  '/application-submitted',
  '/application-rejected',
  '/application-approved',
];

/**
 * Middleware to protect certain routes by requiring a valid auth token.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value ?? null;

  // Normalize trailing slash (e.g., "/dashboard/" → "/dashboard")
  const normalizedPath =
    pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;

  const isProtectedRoute = protectedRoutes.some(
    (route) => normalizedPath === route || normalizedPath.startsWith(`${route}/`),
  );

  // Redirect unauthenticated users
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/', request.url);
    loginUrl.searchParams.set('redirect', pathname); // Store intended destination
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

/**
 * Only apply middleware to protected paths for better performance.
 */
export const config = {
  matcher: [
    '/dashboard',
    '/submit-info',
    '/verify-email',
    '/application-submitted',
    '/application-rejected',
    '/application-approved',
  ],
};
