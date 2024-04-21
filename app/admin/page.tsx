import { authOptions } from "@/lib/auth"
import { getAdmin } from "@/lib/fn"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { redirect } from "next/navigation"

async function Admin() {
    const session = await getServerSession(authOptions)
    if (!!!session) {
        redirect("/auth/signin")
    }

    const isAdmin = await getAdmin(
        session?.user?.email as string
    )
    if (!!!isAdmin) {
        redirect("/dashboard")
    }
    return (
        <div>
            <Link href="/admin/dashboard">
                <span className="m-4 text-2xl font-bold">Go to dashboard</span>
            </Link>
        </div>
    )
}

export default Admin
