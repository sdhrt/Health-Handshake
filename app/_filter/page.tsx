import { getServerSession } from "next-auth"
import Homepage from "./_components/Homepage"
import { authOptions } from "@/lib/auth"
import { getAdmin } from "@/lib/fn"
import { redirect } from "next/navigation"

async function page() {
    {
        const session = await getServerSession(authOptions)
        const isAdmin = await getAdmin(
            session?.user?.email as string
        )
        if (isAdmin) {
            redirect("/admin")
        }
    }
    return (
        <div className="flex flex-col">
            <Homepage />
        </div>
    )
}

export default page
