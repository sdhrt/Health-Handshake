import { connectMongoDB } from "@/lib/mongodb"
import { userModel } from "@/model/userModel"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    const body = await request.json()
    const { industryValue, email }: { industryValue: string; email: string } =
        body

    await connectMongoDB()
    await userModel.findOneAndUpdate(
        { email },
        { $set: { "data.industry": industryValue } },
        { new: true }
    )

    return NextResponse.json({
        status: 200,
        data: { message: `Updated industry to ${industryValue}` },
    })
}
