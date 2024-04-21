import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import UpdateInfo from "./_components/UpdateInfo"
import UpdateIndustry from "./_components/UpdateIndustry"
import UpdateLocation from "./_components/UpdateLocation"
import UpdateContact from "./_components/UpdateContact"
import UpdateServices from "./_components/UpdateServices"

async function page() {
    const session = await getServerSession(authOptions)
    const userEmail: string = session?.user?.email as string

    return (
        <div className="mt-6 flex justify-center">
            <div className="grid grid-cols-1 w-[30%]">
                <UpdateInfo />
                <UpdateIndustry userEmail={userEmail} />
                <UpdateLocation userEmail={userEmail} />
                <UpdateContact userEmail={userEmail} />
                <UpdateServices userEmail={userEmail} />
            </div>
        </div>
    )
}

export default page
