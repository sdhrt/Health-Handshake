import { connectMongoDB } from "@/lib/mongodb"
import { connectModel } from "@/model/connectionModel"
import { userModel } from "@/model/userModel"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { email } = body
    await connectMongoDB()

    const connect = await connectModel
        .find({
            sender: email,
            adminApprove: true,
            approved: true,
        })
        .sort({ updatedAt: 1 })

    const users: {
        name: string
        email: string
        content: string
        contact: string[]
    }[] = []

    const promises = connect.map(async (con) => {
        const user = await userModel
            .findOne({ email: con.reciever })
            .select("-password")
        const { name, email, data } = user
        const { contact } = data
        const { content } = con
        users.push({ name, email, content, contact })
    })
    await Promise.all(promises)

    if (connect) {
        return NextResponse.json({
            data: users,
        })
    } else {
        return NextResponse.json({
            error: "Something went wrong",
        })
    }
}
