import { connectMongoDB } from "@/lib/mongodb"
import { connectModel } from "@/model/connectionModel"
import { NextResponse } from "next/server"

export async function GET() {
    await connectMongoDB()

    const connect = await connectModel
        .find({})
        .sort({ adminApprove: 1 })
    return NextResponse.json({
        data: connect,
    })
}
