import { Home, Settings } from "lucide-react"
import Link from "next/link"
import React from "react"

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import Signout from "../Signout"

function Nav() {
    return (
        <>
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/admin/dashboard"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Home className="h-5 w-5" />
                                <span className="sr-only">
                                    Dashboard
                                </span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            Dashboard
                        </TooltipContent>
                    </Tooltip>
                </nav>
                <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
                    <div>
                        <Signout />
                    </div>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/admin/settings"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Settings className="h-5 w-5" />
                                <span className="sr-only">
                                    Settings
                                </span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            Settings
                        </TooltipContent>
                    </Tooltip>
                </nav>
            </aside>
        </>
    )
}

export default Nav
