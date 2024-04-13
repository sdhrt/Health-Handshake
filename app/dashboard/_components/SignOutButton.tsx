"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

function SignOutButton() {
    const router = useRouter()
    const handleSignOut = async () => {
        await signOut()
        router.push("/")
    }

    return (
        <Button onClick={handleSignOut}>
            <span className="font-semibold">Sign Out</span>
        </Button>
    )
}

export default SignOutButton
