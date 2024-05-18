import { NextResponse, NextRequest } from 'next/server';

export const middleware = (request: NextRequest) => {
    const token = request.cookies.get('token');
    const tokenValue = token?.value;

    if (!tokenValue) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
};

export const config = {
    matcher: [
        '/',
        '/chat/:path*',
        '/orders/:path*',
        '/product/:path*',
        '/products/:path*',
        '/settings/:path*',
    ],
};
