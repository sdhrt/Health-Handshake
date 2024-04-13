import { connectMongoDB } from "@/lib/mongodb"
import { userModel } from "@/model/userModel"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
    await connectMongoDB()
    const services =
        await userModel.distinct("data.services")
    return NextResponse.json({
        status: 200,
        data: services,
    })
}

export async function POST(request: NextRequest) {
    const body = await request.json()
    const { email }: { email: string } = body

    await connectMongoDB()
    const { data } = await userModel
        .findOne({ email })
        .select("data.services")
    return NextResponse.json({ status: 200, data: data })
}
