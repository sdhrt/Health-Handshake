"use client"

import { Button } from "@/components/ui/button"
import { LogOutIcon } from "lucide-react"
import { signOut } from "next-auth/react"

function SignOutButton() {
    const handleSignOut = async () => {
        await signOut({
            callbackUrl: "/auth/signin",
        })
    }

    return (
        <Button onClick={handleSignOut}>
            <LogOutIcon />
        </Button>
    )
}

export default SignOutButton
