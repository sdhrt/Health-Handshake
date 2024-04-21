import { connectMongoDB } from "@/lib/mongodb"
import { userModel } from "@/model/userModel"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { category }: { category: string } = body

    try {
        await connectMongoDB()

        if (category == "institute") {
            const users = await userModel
                .find({ "data.category": "health" })
                .select("-password")
            return NextResponse.json({
                status: 200,
                data: users,
            })
        } else {
            const users = await userModel
                .find()
                .select("-password")
                .sort({ createdAt: -1 })
            return NextResponse.json({
                status: 200,
                data: users,
            })
        }
    } catch (error) {
        throw error
    }
}
