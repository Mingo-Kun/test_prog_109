import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const VALID_TENANTS = ['brand-a', 'brand-b'];

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Check if the path starts with a tenant
    const pathParts = pathname.split('/');
    const tenant = pathParts[1];

    // Ignore static files and api routes for now (unless api is tenant specific)
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/static') ||
        pathname === '/favicon.ico'
    ) {
        return NextResponse.next();
    }

    // If root, redirect to brand-a (or show a landing page, but for this prototype redirect is fine)
    if (pathname === '/') {
        return NextResponse.redirect(new URL('/brand-a', request.url));
    }

    // If the first part is a valid tenant, allow
    if (VALID_TENANTS.includes(tenant)) {
        return NextResponse.next();
    }

    // If it's an API route, we might need to check tenant in headers or query, 
    // but if it's a page route and not a valid tenant, we could 404 or redirect.
    // For simplicity, if it's not a known tenant and not an asset, we might let it pass 
    // (e.g. global pages) or 404. 
    // Let's assume all pages must be under a tenant for this prototype.

    // If it's not a valid tenant, return 404 or redirect to default
    // return NextResponse.rewrite(new URL('/404', request.url));

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
