import mongoose from "mongoose"
const { Schema } = mongoose

mongoose.Promise = global.Promise

const userDataSchema = new Schema({
    category: {
        type: String,
        enum: ["health", "institution", "government"],
    },
    industry: {
        type: String,
        default: "",
    },
    location: {
        type: String,
        default: "",
    },
    services: {
        type: [String],
        unique: true,
        default: [],
    },
    contact: {
        type: [String],
        unique: true,
        default: [],
    },
})

const connectionSchema = new Schema({
    connection: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Connection",
    },
    role: {
        type: String,
        enum: ["sender", "reciever"],
    },
})

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
        },
        email: {
            type: String,
            required: true,
        },
        bio: {
            type: String,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        data: userDataSchema,
        connections: {
            type: [connectionSchema],
            default: [],
        },
    },
    { timestamps: true }
)

export const userModel =
    mongoose.models.User ||
    mongoose.model("User", userSchema)
