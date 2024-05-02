"use server"

import { connectMongoDB } from "@/lib/mongodb"
import { connectModel } from "@/model/connectionModel"

async function getUnreadRequest() {
    await connectMongoDB()

    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const connect = await connectModel.find({
        createdAt: { $gt: sevenDaysAgo },
        adminApprove: false,
        approved: false,
    })
    return connect.length
}

async function UnreadRequest() {
    const connectRequest = await getUnreadRequest()

    return (
        <div className="text-blue-700 font-semibold text-lg underline underline-offset-2">
            {connectRequest} Unread Request
        </div>
    )
}

export default UnreadRequest
