import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import SignUpForm from "../_components/SignUpForm"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function AuthPage() {
    const session = await getServerSession(authOptions)

    if (session) {
        redirect("/")
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <Card className="w-screen mx-12 md:w-[400px] md:mx-0">
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>
                        Sign up and join Health Handshake
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <SignUpForm />
                    <div className="flex items-center justify-center gap-y-4 mt-4">
                        <span className="opacity-50">
                            Already have an account? &nbsp;
                        </span>
                        <Link
                            href="/auth/signin"
                            className="underline underline-offset-1 font-semibold text-nowrap"
                        >
                            Sign In
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
