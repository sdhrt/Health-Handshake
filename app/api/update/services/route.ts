import { connectMongoDB } from "@/lib/mongodb"
import { userModel } from "@/model/userModel"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    const body = await request.json()
    const {
        service,
        email,
    }: { service: string; email: string } = body

    await connectMongoDB()

    if (service) {
        await userModel.findOneAndUpdate(
            { email },
            { $push: { "data.services": service } },
            { new: true }
        )
        return NextResponse.json({
            status: 200,
            data: { message: `Added service ${service}` },
        })
    } else {
        return NextResponse.json({
            status: 400,
            data: { message: "Invalid service" },
        })
    }
}
