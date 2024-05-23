import { NextRequest, NextResponse } from 'next/server';

const privateRoutes = ['/', '/orders', '/settings'];

export default async function middleware(req: NextRequest) {
    const token = req.cookies.has('token');
    console.log(token);

    if (req.nextUrl.pathname.startsWith('/_next')) {
        return NextResponse.next();
    }

    if (!token && privateRoutes.includes(req.nextUrl.pathname)) {
        const absoluteUrl = new URL('/login', req.nextUrl.origin);
        return NextResponse.redirect(absoluteUrl.toString());
    }

    return NextResponse.next();
}
