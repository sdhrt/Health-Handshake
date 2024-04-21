import { connectMongoDB } from "@/lib/mongodb"
import { connectModel } from "@/model/connectionModel"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { id } = body
    await connectMongoDB()

    const connect = await connectModel.findByIdAndUpdate(
        id,
        {
            approved: true,
        }
    )
    console.log(connect)
    if (connect) {
        return NextResponse.json({
            data: {
                message:
                    "You have approved the request, if approved by admin, you can find the contact details in the accepted tabs",
            },
        })
    } else {
        return NextResponse.json({
            data: {
                error: "Something went wrong",
            },
        })
    }
}
