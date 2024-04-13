"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const SignUpForm = () => {
    const router = useRouter()
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
    })

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setInput((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const response = await fetch("/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ input }),
        })
        const userInfo = await response.json()
        if (userInfo.error) {
            return toast({
                title: `${userInfo.error}`,
                duration: 2000,
            })
        }
        if (userInfo) {
            router.push("/auth/signin")
        }
    }

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key == "Enter") {
                handleSubmit(e)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [input.email, input.password, input.name])

    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
                <Label>Organization Name</Label>
                <Input
                    name="name"
                    type="text"
                    onChange={handleChange}
                    autoComplete="off"
                />
            </div>
            <div className="flex flex-col gap-y-2">
                <Label>Organization Email</Label>
                <Input
                    name="email"
                    type="email"
                    onChange={handleChange}
                    autoComplete="off"
                />
            </div>
            <div className="flex flex-col gap-y-2">
                <Label>Password</Label>
                <Input
                    name="password"
                    type="password"
                    onChange={handleChange}
                    autoComplete="off"
                />
            </div>
            <Button className="mt-4" onClick={handleSubmit}>
                <span className="font-semibold">Sign Up</span>
            </Button>
        </div>
    )
}

export default SignUpForm
