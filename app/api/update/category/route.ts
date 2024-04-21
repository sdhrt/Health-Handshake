import { connectMongoDB } from "@/lib/mongodb"
import { userModel } from "@/model/userModel"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    const body = await request.json()
    const {
        category,
        email,
    }: { category: string; email: string } = body

    await connectMongoDB()

    await userModel.findOneAndUpdate(
        { email },
        { $set: { "data.category": category } },
        { new: true }
    )

    return NextResponse.json({
        status: 200,
        data: {
            message: `Updated category to ${category}`,
        },
    })
}
