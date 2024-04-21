import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { connectMongoDB } from "./mongodb"
import { userModel } from "@/model/userModel"
import bcrypt from "bcrypt"

import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET as string,
    pages: {
        signIn: "/auth/signin",
    },
    callbacks: {
        async signIn({ account, profile }) {
            if (account?.provider === "google") {
                const data = {
                    name: profile?.name,
                    email: profile?.email,
                    provider: account.provider,
                }
                await connectMongoDB()
                const exists = await userModel.findOne({
                    email: data.email,
                })
                if (exists) {
                    return true
                }

                const user = await userModel.create({
                    name: data.name,
                    email: data.email,
                    data: {},
                })
                if (user) {
                    return true
                }
            }
            return true
        },
    },
    providers: [
        GoogleProvider({
            clientId: process.env
                .GOOGLE_CLIENT_ID as string,
            clientSecret: process.env
                .GOOGLE_CLIENT_SECRET as string,
        }),
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
