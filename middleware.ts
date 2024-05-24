import { NextResponse, NextRequest } from 'next/server';
import { getCookie } from 'cookies-next';

export const middleware = (req: NextRequest) => {
    const isLoggedIn = getCookie('isLoggedIn', { req }) === 'true';

    if (!isLoggedIn) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next();
};

export const config = {
    matcher: [
        '/',
        '/orders/:path*',
        '/products/:path*',
        '/product/:path*',
        '/settings/:path*',
        '/chat/:path*',
    ],
};
