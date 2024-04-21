import { connectMongoDB } from "@/lib/mongodb"
import { userModel } from "@/model/userModel"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    const body = await request.json()
    const { email }: { email: string } = body

    await connectMongoDB()
    const { data } = await userModel
        .findOne({ email })
        .select("data.location")
    if (data) {
        return NextResponse.json({
            status: 200,
            data: data,
        })
    } else {
        return NextResponse.json({
            status: 200,
            data: "",
        })
    }
}
