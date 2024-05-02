import { connectMongoDB } from "@/lib/mongodb"
import { connectModel } from "@/model/connectionModel"
import { userModel } from "@/model/userModel"
import { NextRequest, NextResponse } from "next/server"

// Reject
export async function POST(req: NextRequest) {
    const body = await req.json()
    const { id } = body

    await connectMongoDB()

    // $or: [
    //     { email: connect.sender },
    //     { email: connect.reciever },
    // ],
    try {
        const connect = await connectModel.findById(id)
        await userModel.findOneAndUpdate(
            {
                email: connect.sender,
            },
            {
                $pull: {
                    connections: {
                        connection: id,
                    },
                },
            },
            { new: true }
        )
        await userModel.findOneAndUpdate(
            {
                email: connect.reciver,
            },
            {
                $pull: {
                    connections: {
                        connection: id,
                    },
                },
            },
            { new: true }
        )
        await connectModel.findByIdAndDelete(id)
        return NextResponse.json({
            data: {
                message: "Deleted",
            },
        })
    } catch (error) {
        return NextResponse.json({
            data: {
                error: error,
            },
        })
    }
}
