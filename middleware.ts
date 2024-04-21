import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
// export { default } from "next-auth/middleware"
import { NextRequest, NextResponse } from "next/server"

export const config = {
    matcher: ["/dashboard/:path*", "/api/:path*"],
}

export default withAuth(async function middleware(
    req: NextRequest
) {
    const token = await getToken({ req })

    const isAuth = !!token
    const isAuthPage =
        req.nextUrl.pathname.startsWith("/auth")

    if (isAuthPage) {
        if (isAuth) {
            return NextResponse.redirect(
                new URL("/dashboard", req.url)
            )
        }
        return null
    }

    if (!isAuth) {
        return NextResponse.redirect(
            new URL("/auth/signin", req.nextUrl.origin)
        )
    }

    return NextResponse.next()
})
