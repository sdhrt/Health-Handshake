import { TooltipProvider } from "@/components/ui/tooltip"
import Nav from "./_components/nav/Nav"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getAdmin } from "@/lib/fn"

async function layout({
    children,
}: {
    children: React.ReactNode
}) {
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
        <>
            <TooltipProvider>
                <Nav />
            </TooltipProvider>
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <div className="sm:hidden sm:text-2xl font-bold grid place-items-center h-screen">
                    View in desktop
                </div>
                {children}
            </div>
        </>
    )
}

export default layout
