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
import { toast } from "@/components/ui/use-toast"
import { User } from "@/types/userModelInterface"

function ConnectAlert({ org }: { org: User }) {
    const handleConnect = () => {
        return toast({
            title: "Functionality has not been implemented",
            duration: 4000,
        })
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">Connect</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Do you want to connect with {org.name}?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Connecting will result in sharing your contact
                        information with {org.name}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConnect}>
                        Connect
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ConnectAlert
