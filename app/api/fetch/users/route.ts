import { connectMongoDB } from "@/lib/mongodb"
import { userModel } from "@/model/userModel"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        await connectMongoDB()
        const users = await userModel.find()
        return NextResponse.json({ status: 200, data: users })
    } catch (error) {
        throw error
    }
}
