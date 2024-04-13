import { Settings } from "lucide-react"
import Link from "next/link"

import SignOutButton from "./SignOutButton"
import MessagePopover from "./MessagePopover"
import { Button } from "@/components/ui/button"

function Navbar() {
    return (
        <nav className="flex items-center justify-between w-screen h-16 px-4 lg:px-24">
            <span className="font-bold md:text-xl">
                <Link href="/dashboard">Health Handshake</Link>
            </span>
            <div className="flex gap-x-2 md:gap-x-8 items-center">
                <MessagePopover />
                <Link href="/dashboard/profile">
                    <Button variant="outline">
                        <Settings />
                    </Button>
                </Link>
                <SignOutButton />
            </div>
        </nav>
    )
}

export default Navbar
