import { getServerSession } from "next-auth"
import Navbar from "./_components/Navbar"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

async function layout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions)
    if (session == null) {
        redirect("/auth/signin")
    }
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default layout
