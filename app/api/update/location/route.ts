import { connectMongoDB } from "@/lib/mongodb"
import { userModel } from "@/model/userModel"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    const body = await request.json()
    const {
        location,
        email,
    }: { location: string; email: string } = body

    await connectMongoDB()

    if (location.length > 1) {
        await userModel.findOneAndUpdate(
            { email },
            { $set: { "data.location": location } },
            { new: true }
        )
        return NextResponse.json({
            status: 200,
            data: {
                message: `Updated location to ${location}`,
            },
        })
    }
}
