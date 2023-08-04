import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server';
 
export function middleware(request: NextRequest, response: NextResponse) {
    const path = request.nextUrl.pathname;

    const isPublicPath = path === '/Authentication';

    const token = request.cookies.get('token')?.value || '';

    if (token && isPublicPath) return NextResponse.redirect(new URL('/', request.nextUrl));
    
    if(!token && !isPublicPath) return NextResponse.redirect(new URL('/Authentication', request.nextUrl));
}
 
export const config = {
  matcher: ['/', '/about', '/Authentication'],
}