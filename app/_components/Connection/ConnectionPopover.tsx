import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Inbox } from "lucide-react"
import Connections from "./Connections"
import ConnectionBadge from "./ConnectionBadge"

export default function ConnectionPopover() {
    return (
        <div>
            <div className="relative">
                <ConnectionBadge />
            </div>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="ghost">
                        <Inbox />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <Connections />
                </PopoverContent>
            </Popover>
        </div>
    )
}
