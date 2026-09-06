import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const languages = ['en', 'de']
const defaultLanguage = 'en'

export function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl

    const pathnameHasLocale = languages.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) return NextResponse.next()

    
    request.nextUrl.pathname =  `/${defaultLanguage}${pathname}`
    return NextResponse.redirect(request.nextUrl)
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}