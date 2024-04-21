import { connectMongoDB } from "@/lib/mongodb"
import { userModel } from "@/model/userModel"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    const body = await request.json()
    const {
        name,
        email,
        userEmail,
    }: {
        name: string
        email: string
        userEmail: string
    } = body
    let message = "Updated "

    await connectMongoDB()
    const exists = await userModel.findOne({
        email: userEmail,
    })
    if (exists) {
        if (name.length > 0) {
            await userModel.updateOne(
                { email: userEmail },
                { name: name }
            )

            message = message + "name "
        }
        if (email.length > 0) {
            await userModel.updateOne(
                { email: userEmail },
                { email: email }
            )
            message = message + "email "
        }
    }
    return NextResponse.json({
        status: 200,
        data: { message: message },
    })
}
