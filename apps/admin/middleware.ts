import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define the routes that require authentication
const protectedRoutes = ['/dashboard', '/settings', '/profile'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  // If trying to access a protected route and no token is present, redirect to login
  if (isProtected && !token) {
    const loginUrl = new URL('/', request.url);
    loginUrl.searchParams.set('redirect', pathname); // Optional: add redirect back after login
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Apply middleware to only specific paths
export const config = {
  matcher: ['/dashboard/:path*'],
};
