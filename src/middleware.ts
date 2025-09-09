// middleware.ts
import { NextResponse, NextRequest } from 'next/server';

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/van-ban", request.url));
    }
    return NextResponse.next();
}
