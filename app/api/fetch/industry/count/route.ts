import { connectMongoDB } from "@/lib/mongodb"
import { userModel } from "@/model/userModel"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
    await connectMongoDB()
    try {
        const industryCounts = await userModel.aggregate([
            {
                $match: {
                    "data.industry": {
                        $exists: true,
                        $ne: "",
                    },
                }, // Filter documents with non-empty industry field
            },
            {
                $group: {
                    _id: "$data.industry",
                    count: { $sum: 1 }, // Count documents in each group
                },
            },
        ])

        return NextResponse.json({
            data: industryCounts,
        })
    } catch (error) {
        return NextResponse.json({ error: error })
    }
}
