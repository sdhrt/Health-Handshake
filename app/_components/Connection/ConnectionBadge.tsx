"use server"

import { authOptions } from "@/lib/auth"
import { connectMongoDB } from "@/lib/mongodb"
import { connectModel } from "@/model/connectionModel"
import { getServerSession } from "next-auth"

async function getCount() {
    const session = await getServerSession(authOptions)

    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    await connectMongoDB()
    const connects = await connectModel.find({
        createdAt: { $gt: sevenDaysAgo },
        $or: [
            { sender: session?.user?.email },
            { reciever: session?.user?.email },
        ],
    })

    return connects.length
}
async function ConnectionBadge() {
    const connectCount = await getCount()

    return (
        <div className="rounded-[100px] text-sm bg-red-700 flex items-center justify-center w-6 h-6 absolute -right-2 -top-2">
            {connectCount}
        </div>
    )
}

export default ConnectionBadge
