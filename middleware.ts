// export { default } from "next-auth/middleware"
import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        const token = getToken({ req })
        if (!!token) {
            return NextResponse.redirect(
                `${req.nextUrl.origin}`
            )
        }
    },
    {
        pages: {
            signIn: "/auth/signin",
        },
    }
)

export const config = {
    matcher: ["/dashboard"],
}
