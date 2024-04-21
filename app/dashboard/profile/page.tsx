import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import UpdateInfo from "./_components/UpdateInfo"
import UpdateIndustry from "./_components/UpdateIndustry"
import UpdateLocation from "./_components/UpdateLocation"
import UpdateContact from "./_components/UpdateContact"
import UpdateServices from "./_components/UpdateServices"
import UpdateBio from "./_components/UpdateBio"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Profile",
}

async function page() {
    const session = await getServerSession(authOptions)
    const userEmail: string = session?.user?.email as string

    return (
        <div className="mt-6 flex justify-center">
            <div className="grid grid-cols-1 w-[30%]">
                <UpdateInfo />
                <UpdateBio userEmail={userEmail} />
                <UpdateIndustry userEmail={userEmail} />
                <UpdateLocation userEmail={userEmail} />
                <UpdateContact userEmail={userEmail} />
                <UpdateServices userEmail={userEmail} />
            </div>
        </div>
    )
}

export default page
