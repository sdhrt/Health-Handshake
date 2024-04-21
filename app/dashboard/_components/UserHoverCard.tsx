import { Button } from "@/components/ui/button"
import { User } from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link"

export async function UserHoverCard() {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Button
                        variant={"ghost"}
                        asChild
                    >
                        <Link href="/dashboard/profile">
                            <User />
                        </Link>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Edit profile</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
