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
        <Button
            onClick={handleSignOut}
            variant={"ghost"}
            className="w-max"
            asChild
        >
            <div className="flex items-center justify-center gap-2 py-1 rounded-lg transition-colors hover:text-foreground ">
                <LogOutIcon className="h-5 w-5" />
                <span className="text-xl font-semibold">Sign Out</span>
            </div>
        </Button>
    )
}

export default SignOutButton
