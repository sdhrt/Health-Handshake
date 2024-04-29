import { Home, Settings, Activity } from "lucide-react"
import Link from "next/link"
import React from "react"
import SignOutButton from "@/app/_components/Navbar/SignOutButton"

function Nav() {
    return (
        <>
            <div className="absolute left-0 h-screen flex flex-col w-64 items-center justify-between bg-blue-100 border-r-4 border-blue-200">
                <div className="flex flex-col gap-4 pt-4">
                    <Link
                        href="/admin"
                        className="flex items-center justify-center gap-2 py-1 rounded-lg text-muted-foreground transition-colors hover:text-foreground "
                    >
                        <Home className="h-5 w-5" />
                        <span className="">Home</span>
                    </Link>
                    <Link
                        href="/admin/dashboard"
                        className="flex items-center justify-center gap-2 py-1 rounded-lg text-muted-foreground transition-colors hover:text-foreground "
                    >
                        <Activity className="h-5 w-5" />
                        <span className="">Dashboard</span>
                    </Link>
                </div>
                <div className="flex items-center justify-center gap-2 py-1 rounded-lg text-muted-foreground transition-colors hover:text-foreground ">
                    <SignOutButton />
                </div>
            </div>
        </>
    )
}

export default Nav
