import { authOptions } from "@/lib/auth"
import { getAdmin } from "@/lib/fn"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import AdminDash from "./_components/AdminDash"

async function Admin() {
    const session = await getServerSession(authOptions)
    const isAdmin = await getAdmin(
        session?.user?.email as string
    )
    if (!!!isAdmin) {
        redirect("/dashboard")
    }
    return (
        <div>
            <AdminDash />
        </div>
    )
}

export default Admin
