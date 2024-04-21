import { connectMongoDB } from "@/lib/mongodb"
import { connectModel } from "@/model/connectionModel"
import { NextRequest, NextResponse } from "next/server"

// Reject
export async function POST(req: NextRequest) {
    const body = await req.json()
    const { id } = body

    await connectMongoDB()

    try {
        await connectModel.findByIdAndDelete(id)
        return NextResponse.json({
            data: {
                message: "Deleted",
            },
        })
    } catch (error) {
        return NextResponse.json({
            data: {
                error: error,
            },
        })
    }
}
