import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { User } from "@/types/userModelInterface"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

function ConnectAlert({ org }: { org: User }) {
    const { data: session } = useSession()

    const [category, setCategory] = useState<string>()
    useEffect(() => {
        ;(async () => {
            if (session?.user?.email) {
                const response = await fetch(
                    "/api/fetch/category",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        body: JSON.stringify({
                            email: session.user.email,
                        }),
                    }
                )
                const { data } = await response.json()
                setCategory(data.category)
            }
        })()
    }, [])
    const handleConnect = async () => {
        if (reason.length < 1) {
            toast({
                title: "Reason cannot be empty",
            })
            return
        }

        if (session) {
            const response = await fetch("/api/connect", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    senderEmail: session?.user?.email,
                    recieverEmail: org.email,
                    content: reason,
                }),
            })
            const responseData = await response.json()
            if (responseData.error) {
                toast({
                    title: `${responseData.error}`,
                    duration: 4000,
                })
                return
            }
            if (responseData.data.message) {
                toast({
                    title: `${responseData.data.message}`,
                    duration: 4000,
                })
                return
            }
        }
    }
    const [reason, setReason] = useState<string>("")
    const handleChange = (e) => {
        setReason(e.target.value)
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="outline"
                    className="bg-[#218aff] text-[#fafaff] rounded-sm"
                >
                    Connect
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {category === org.data.category &&
                        category != "health" ? (
                            <Label htmlFor="message-2">
                                You can only connect with
                                health institutes.
                            </Label>
                        ) : (
                            <Label htmlFor="message-2">
                                Why do you want to connect
                                with {org.name}?
                            </Label>
                        )}
                    </AlertDialogTitle>
                    {(category == "health" ||
                        category !== org.data.category) && (
                        <AlertDialogDescription asChild>
                            <div className="grid w-full gap-1.5">
                                <span className="text-sm text-muted-foreground">
                                    <div>
                                        <Textarea
                                            placeholder="Type your reason here..."
                                            id="message-2"
                                            onChange={
                                                handleChange
                                            }
                                        />
                                        <div>
                                            The request will
                                            be sent to the
                                            admin team for
                                            approval
                                        </div>
                                    </div>
                                </span>
                            </div>
                        </AlertDialogDescription>
                    )}
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConnect}
                        disabled={
                            category == org.data.category &&
                            category != "health"
                        }
                    >
                        Connect
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ConnectAlert
