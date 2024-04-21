"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import React from "react"

function Signout() {
    return (
        <Button
            className="text-muted-foreground transition-colors hover:text-foreground"
            variant={"ghost"}
            onClick={() =>
                signOut({ callbackUrl: "/auth/signin" })
            }
        >
            <LogOut className="h-5 w-5" />
        </Button>
    )
}

export default Signout
