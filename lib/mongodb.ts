import mongoose from "mongoose"

let isConnected = false

export const connectMongoDB = async () => {
    if (!isConnected) {
        try {
            await mongoose.connect(
                process.env.MONGODB_URI as string
            )
            isConnected = true
        } catch (error) {
            throw error
        }
    }
}
