import { connectMongoDB } from "@/lib/mongodb"
import { userModel } from "@/model/userModel"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    const body = await request.json()
    const { industry }: { industry: string } = body

    await connectMongoDB()

    try {
        const data = await userModel.find({
            "data.industry": industry,
        })

        return NextResponse.json({
            status: 200,
            data: data,
        })
    } catch (error) {
        return NextResponse.json({
            error: error,
        })
    }
}
