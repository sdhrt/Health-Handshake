import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Inbox } from "lucide-react"
import Connections from "./Connections"

export default function ConnectionPopover() {
    return (
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
    )
}
