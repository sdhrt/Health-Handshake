import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Inbox } from "lucide-react"

export default function MessagePopover() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">
                    <Inbox />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Connection</h4>
                        <p className="text-sm text-muted-foreground">
                            Connection request
                        </p>
                    </div>
                    <div className="">..</div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
