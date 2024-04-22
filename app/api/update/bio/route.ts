import { connectMongoDB } from "@/lib/mongodb"
import { userModel } from "@/model/userModel"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    const body = await request.json()
    const { bio, email }: { bio: string; email: string } =
        body

    await connectMongoDB()

    if (bio.length > 1) {
        const user = await userModel.findOneAndUpdate(
            { email },
            { bio: bio },
            { new: true }
        )
        return NextResponse.json({
            status: 200,
            data: {
                message: `Updated bio`,
            },
        })
    }
    return NextResponse.json({
        error: "No bio found",
    })
}
