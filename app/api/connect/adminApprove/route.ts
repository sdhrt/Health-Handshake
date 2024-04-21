import { connectMongoDB } from "@/lib/mongodb"
import { connectModel } from "@/model/connectionModel"
import { NextRequest, NextResponse } from "next/server"

// Approve
export async function POST(req: NextRequest) {
    const body = await req.json()
    const { id } = body

    await connectMongoDB()

    try {
        const connection =
            await connectModel.findByIdAndUpdate(
                id,
                { adminApprove: true },
                { new: true }
            )

        return NextResponse.json({
            data: connection,
        })
    } catch (error) {
        return NextResponse.json({
            data: {
                error: error,
            },
        })
    }
}
