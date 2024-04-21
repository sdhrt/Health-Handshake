import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/admin/:path*",
        "/api/:path*",
    ],
}

export default withAuth(
    async function middleware(req) {
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
            if (!isAuthPage) {
                return NextResponse.redirect(
                    new URL("/auth/signin", req.url)
                )
            }
        }
    },
    {
        callbacks: {
            async authorized() {
                return true
            },
        },
    }
)
