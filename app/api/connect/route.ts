import { connectMongoDB } from "@/lib/mongodb"
import { connectModel } from "@/model/connectionModel"
import { userModel } from "@/model/userModel"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    const body = await request.json()
    const { senderEmail, recieverEmail, content } = body

    await connectMongoDB()

    const exist = await connectModel.findOne({
        sender: senderEmail,
        reciever: recieverEmail,
        approved: false,
    })

    if (exist) {
        return NextResponse.json({
            error: "Your connection request has already been made. Your request is pending. Please wait...",
        })
    }

    const connect = await connectModel.create({
        sender: senderEmail,
        reciever: recieverEmail,
        content: content,
        approved: false,
    })

    if (connect) {
        const updatedSen = await userModel.findOneAndUpdate(
            { email: senderEmail },
            {
                $push: {
                    connections: {
                        connection: connect._id,
                        role: "sender",
                    },
                },
            },
            { new: true }
        )
        const updatedReciever =
            await userModel.findOneAndUpdate(
                { email: recieverEmail },
                {
                    $push: {
                        connections: {
                            connection: connect._id,
                            role: "reciever",
                        },
                    },
                },
                { new: true }
            )

        return NextResponse.json({
            data: {
                message:
                    "Your request has been made. It may take 2-3 working days to get admins' approval",
            },
        })
    }

    return NextResponse.json({
        error: "Oops, couldn't send message, please try again later",
    })
}
