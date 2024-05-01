import { NextResponse, NextRequest } from 'next/server';

export const middleware = (request: NextRequest) => {
    const authToken = request.cookies.has('token');

    if (authToken === false) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
};

export const config = {
    matcher: [
        '/',
        // '/chat/:path*',
        // '/orders/:path*',
        // '/product/:path*',
        // '/products/:path*',
        // '/settings/:path*',
    ],
};
