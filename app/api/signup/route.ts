import { connectMongoDB } from "@/lib/mongodb"
import { userModel } from "@/model/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt"

export async function POST(request: NextRequest) {
    const body = await request.json()
    const { name, email, password } = body.input

    if (!name || !email || !password) {
        return NextResponse.json({
            error: "Some fields required to sign up are missing",
        })
    }

    await connectMongoDB()
    const exists = await userModel.findOne({ email })
    if (exists) {
        return NextResponse.json({
            error: `${email} is already being used.`,
        })
    }

    const data = {}
    const hash = await bcrypt.hash(password, 10) // 10 is saltRounds
    const user = await userModel.create({
        name,
        email,
        password: hash,
        data,
    })
    if (user) {
        return NextResponse.json({ ok: true })
    }
}
