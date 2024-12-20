// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const user = request.cookies.get('user');
  const { pathname } = request.nextUrl;

  // Auth pages that should redirect to dashboard if logged in
  const authPages = ['/login', '/signup'];
  
  // Protected pages that require authentication
  const protectedPages = ['/dashboard', '/profile'];

  // If user is logged in and tries to access auth pages, redirect to dashboard
  if (user && authPages.some(page => pathname.startsWith(page))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If user is not logged in and tries to access protected pages, redirect to login
  if (!user && protectedPages.some(page => pathname.startsWith(page))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Update the config to include all relevant paths
export const config = {
  matcher: [
    // Auth pages
    '/login',
    '/signup',
    // Protected pages
    '/dashboard/:path*',
    '/profile/:path*'
  ],
};