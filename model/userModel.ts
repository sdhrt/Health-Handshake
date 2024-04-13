import mongoose from "mongoose"
const { Schema } = mongoose

mongoose.Promise = global.Promise

const userDataSchema = new Schema({
    industry: String,
    location: String,
    services: {
        type: [String],
        unique: true,
    },
    contact: {
        type: [String],
        unique: true,
    },
})

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    data: userDataSchema,
})

export const userModel =
    mongoose.models.User || mongoose.model("User", userSchema)
