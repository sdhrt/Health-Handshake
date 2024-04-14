import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export { default } from "next-auth/middleware"

export const config = { matcher: ["/dashboard/:path*"] }

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })
    const isAuth = !!token

    const { pathname } = request.nextUrl

    if (isAuth) {
        return NextResponse.next()
    } else {
        if (pathname.startsWith("/dashboard")) {
            // Redirect to login (or a custom unauthorized page):
            return NextResponse.redirect(
                new URL("/auth/signin", request.url)
            )
        }
    }
}
