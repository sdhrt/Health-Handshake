import mongoose from "mongoose"
const { Schema } = mongoose

mongoose.Promise = global.Promise

const connectSchema = new Schema(
    {
        sender: {
            type: String,
            required: true,
        },
        reciever: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        adminApprove: {
            type: Boolean,
            default: false,
        },
        approved: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
)

export const connectModel =
    mongoose.models.Connection ||
    mongoose.model("Connection", connectSchema)
