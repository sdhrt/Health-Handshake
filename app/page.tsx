import { redirect } from "next/navigation"

export default async function Home() {
    // This page is redundant
    redirect("/auth/signin")
}
