import { connectMongoDB } from "@/lib/mongodb"
import { userModel } from "@/model/userModel"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    const body = await request.json()
    const { contact, email }: { contact: string; email: string } = body

    await connectMongoDB()

    const pattern = /(\+977)?[9][6-9]\d{8}/
    if (pattern.test(contact)) {
        await userModel.findOneAndUpdate(
            { email },
            { $push: { "data.contact": contact } },
            { new: true }
        )
        return NextResponse.json({
            status: 200,
            data: { message: `Added contact number ${contact}` },
        })
    } else {
        return NextResponse.json({
            status: 400,
            data: { message: "Not valid phone number" },
        })
    }
}
