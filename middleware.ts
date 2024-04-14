import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "./lib/auth"
export { default } from "next-auth/middleware"

export const config = { matcher: ["/dashboard/:path*"] }

export async function middleware(request: NextRequest) {
    const session = getServerSession(authOptions)
    if (session == null) {
        return NextResponse.redirect(
            new URL("/auth/signin", request.url)
        )
    }
}
