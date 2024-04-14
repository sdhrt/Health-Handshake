import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { SignInForm } from "../_components/SignInForm"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function AuthPage() {
    const session = await getServerSession(authOptions)

    if (session) {
        redirect("/dashboard")
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>Log in</CardTitle>
                    <CardDescription>
                        Login in order to access Health
                        Handshake
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <SignInForm />
                    <div className="flex items-center justify-center gap-y-4 mt-4">
                        <span className="opacity-50">
                            New to HealthHandshake? &nbsp;
                        </span>

                        <Link
                            href="/auth/signup"
                            className="underline underline-offset-1 font-semibold text-nowrap"
                        >
                            Sign Up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
