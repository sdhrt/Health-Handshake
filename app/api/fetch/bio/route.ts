import { connectMongoDB } from "@/lib/mongodb"
import { userModel } from "@/model/userModel"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    const body = await request.json()
    const { email }: { email: string } = body

    await connectMongoDB()
    const { bio } = await userModel
        .findOne({ email })
        .select("bio")
    if (bio) {
        return NextResponse.json({
            status: 200,
            data: bio,
        })
    } else {
        return NextResponse.json({
            error: "error fetching bio",
        })
    }
}
