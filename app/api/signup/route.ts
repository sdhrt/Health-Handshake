import { connectMongoDB } from "@/lib/mongodb"
import { userModel } from "@/model/userModel"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    const body = await request.json()
    const { name, email, password } = body.input

    if (!name || !email || !password) {
        return NextResponse.json(
            { error: "Some fields required to sign up are missing" },
            { status: 400 }
        )
    }

    await connectMongoDB()
    const exists = await userModel.findOne({ email })
    if (exists) {
        return NextResponse.json(
            { error: `${email} is already being used.` },
            { status: 400 }
        )
    }

    const data = {}
    const user = await userModel.create({
        name,
        email,
        password,
        data,
    })

    return NextResponse.json(user)
}
