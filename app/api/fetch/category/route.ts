import { connectMongoDB } from "@/lib/mongodb"
import { userModel } from "@/model/userModel"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { email } = body

    await connectMongoDB()

    if (!!email) {
        const { data } = await userModel
            .findOne({ email })
            .select("data.category")
        if (data) {
            return NextResponse.json({
                status: 200,
                data: data,
            })
        }
    }

    return NextResponse.json({ data: null })
}
