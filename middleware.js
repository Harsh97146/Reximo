import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Check if it's an admin route that needs protection
  if (pathname.startsWith('/admin/dashboard')) {
    const token = request.cookies.get('adminToken')?.value;
    
    // If no token is found, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  // If it's the login page and user is already logged in, redirect to dashboard
  if (pathname === '/admin/login') {
    const token = request.cookies.get('adminToken')?.value;
    
    if (token) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*', '/admin/login']
};