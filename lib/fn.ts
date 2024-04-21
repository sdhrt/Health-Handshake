import { connectMongoDB } from "@/lib/mongodb"
import { userModel } from "@/model/userModel"

export const getAdmin = async (
    email: string
): Promise<Boolean> => {
    "use server"

    await connectMongoDB()

    const { isAdmin } = await userModel
        .findOne({ email })
        .select("isAdmin")
    return isAdmin
}
