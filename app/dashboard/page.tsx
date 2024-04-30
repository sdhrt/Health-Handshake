import { getServerSession } from "next-auth"
import InstituteGrid from "./_components/InstituteGrid"
import { authOptions } from "@/lib/auth"
import { getAdmin } from "@/lib/fn"
import { redirect } from "next/navigation"
import TieUp from "./_components/TieUp/TieUp"
import IndustryAlert from "./_components/IndustryAlert"

async function page() {
    const session = await getServerSession(authOptions)
    const isAdmin = await getAdmin(
        session?.user?.email as string
    )
    if (isAdmin) {
        redirect("/admin")
    }
    return (
        <main className="flex justify-center bg-[#fff] h-screen">
            <div className="flex flex-col items-center gap-4">
                <div>
                    <IndustryAlert
                        email={
                            session?.user?.email as string
                        }
                    />
                </div>
                <div>
                    <InstituteGrid />
                </div>
                <div>
                    <TieUp />
                </div>
            </div>
        </main>
    )
}

export default page
