import Homepage from "./_components/Homepage"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Spinner } from "@/components/ui/spinner"

async function page() {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
        return (
            <div className="flex items-center justify-center h-screen w-screen">
                <Spinner size={"icon"} />
            </div>
        )
    }
    return (
        <div className="flex flex-col">
            <Homepage />
        </div>
    )
}

export default page
