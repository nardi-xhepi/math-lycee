import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value || '';

  // Return early if no session exists
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Validate the session
    const decodedClaims = await adminAuth.verifySessionCookie(session, true);

    // Check if the route requires specific roles
    const pathname = request.nextUrl.pathname;
    
    // Example: admin routes
    if (pathname.startsWith('/admin')) {
      const isAdmin = decodedClaims.role === 'admin';
      if (!isAdmin) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    }

    // Example: premium routes
    if (pathname.includes('/premium')) {
      const isPremium = ['premium', 'vip', 'admin'].includes(decodedClaims.role);
      if (!isPremium) {
        return NextResponse.redirect(new URL('/subscription', request.url));
      }
    }

    // User is authenticated
    return NextResponse.next();
  } catch (error) {
    // Cookie is invalid or expired
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Only run middleware on specific paths
export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/admin/:path*',
    '/premium/:path*'
  ],
};