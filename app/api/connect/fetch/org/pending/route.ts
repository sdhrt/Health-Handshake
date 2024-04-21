import { connectMongoDB } from "@/lib/mongodb"
import { connectModel } from "@/model/connectionModel"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { email } = body
    await connectMongoDB()

    const connectRecieve = await connectModel.find({
        reciever: email,
        $or: [{ adminApprove: false }, { approve: false }],
    })
    const connectSend = await connectModel.find({
        sender: email,
    })
    return NextResponse.json({
        data: {
            recieve: connectRecieve,
            sent: connectSend,
        },
    })
}
