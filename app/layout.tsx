import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import AuthProvider from "@/components/providers/session.provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Health Handshake",
    description: "Created by Siddhartha Shrestha",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <AuthProvider>
                    <body className={inter.className}>
                        <main>{children}</main>
                        <Toaster />
                    </body>
            </AuthProvider>
        </html>
    )
}
