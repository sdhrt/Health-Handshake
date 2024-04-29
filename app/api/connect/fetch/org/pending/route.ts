import { connectMongoDB } from "@/lib/mongodb"
import { connectModel } from "@/model/connectionModel"
import { NextRequest, NextResponse } from "next/server"

// /api/connect/fetch/org/pending
export async function POST(req: NextRequest) {
    const body = await req.json()
    const { email } = body
    await connectMongoDB()

    const connectRecieve = await connectModel.find({
        reciever: email,
        adminApprove: true,
        approved: false,
    })
    const connectSend = await connectModel.find({
        sender: email,
        $or: [{ adminApprove: false }, { approve: false }],
    })
    return NextResponse.json({
        data: {
            recieve: connectRecieve,
            sent: connectSend,
        },
    })
}
