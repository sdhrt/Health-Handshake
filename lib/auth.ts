import { NextAuthOptions } from "next-auth"
import { connectMongoDB } from "./mongodb"
import { userModel } from "@/model/userModel"
import bcrypt from "bcrypt"

import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET as string,
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "email" },
                password: {
                    label: "password",
                    type: "password",
                },
            },
            async authorize(credentials) {
                const { email, password } =
                    credentials as any

                if (!email || !password) {
                    return null
                }

                await connectMongoDB()
                const user = await userModel.findOne({
                    email,
                })

                if (!user) {
                    throw new Error("User doesn't exist")
                }

                const result = await bcrypt.compare(
                    password,
                    user.password
                )
                if (result) {
                    return user
                } else {
                    throw new Error(
                        "Password doesn't match"
                    )
                }
            },
        }),
    ],
} satisfies NextAuthOptions
