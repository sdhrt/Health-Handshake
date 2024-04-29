import Link from "next/link"

import SignOutButton from "./SignOutButton"

import { UserHoverCard } from "./UserHoverCard"
import ConnectionPopover from "../Connection/ConnectionPopover"
import Image from "next/image"

function Navbar() {
    return (
        <nav className="flex items-center justify-between w-screen h-16 px-4 lg:px-24 bg-[#141920] shadow-md shadow-blue-200/80">
            <div>
                <Link
                    prefetch={true}
                    href="/dashboard"
                    className="flex items-center gap-1"
                >
                    <Image
                        src={
                            "/icons/HealthHandshakeCircle.svg"
                        }
                        width={36}
                        height={36}
                        alt="logo"
                    />
                    <span className="hidden md:block font-bold md:text-xl text-white">
                        Health Handshake
                    </span>
                </Link>
            </div>
            <div className="flex gap-x-1 items-center text-white">
                <ConnectionPopover />
                <UserHoverCard />
                <SignOutButton />
            </div>
        </nav>
    )
}

export default Navbar
