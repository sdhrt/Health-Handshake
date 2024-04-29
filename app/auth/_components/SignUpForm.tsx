"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectItem,
} from "@/components/ui/select"

export const SignUpForm = () => {
    const router = useRouter()
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        category: "",
    })

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setInput((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelect = (value: string) => {
        setInput((prev) => ({ ...prev, category: value }))
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if (input.password == "") {
            toast({
                title: "Passowrd cannot be empty",
            })
            return
        }
        if (input.email == "") {
            toast({
                title: "Email cannot be empty",
            })
            return
        }
        if (input.name == "") {
            toast({
                title: "Name cannot be empty",
            })
            return
        }
        if (input.category == "") {
            toast({
                title: "Please choose a category",
            })
            return
        }

        ;(() => {
            toast({
                title: "Signing up...",
            })
        })()
        const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ input }),
        })
        if (!response.ok) {
            toast({
                title: "Something went wrong",
                duration: 2000,
                variant: "destructive",
            })
        } else {
            try {
                const { ok, error } = await response.json()
                if (ok) {
                    router.push("/auth/signin")
                } else {
                    toast({
                        title: `${error}`,
                        duration: 2000,
                        variant: "destructive",
                    })
                }
            } catch (error) {
                throw error
            }
        }
    }

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key == "Enter") {
                handleSubmit(e)
            }
        }
        document.addEventListener("keydown", down)
        return () =>
            document.removeEventListener("keydown", down)
    }, [input])

    return (
        <div className="flex flex-col gap-y-4">
            <div className="">
                <h1 className="text-2xl font-bold">
                    Join Health Handshake
                </h1>
            </div>
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
            <div className="flex flex-col gap-y-2">
                <Label>Choose category</Label>
                <Select onValueChange={handleSelect}>
                    <SelectTrigger>
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="health">
                            Health Institute
                        </SelectItem>
                        <SelectItem value="institute">
                            Private Institute
                        </SelectItem>
                        <SelectItem value="government" disabled>
                            Government
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Button className="mt-4" onClick={handleSubmit}>
                <span className="font-semibold">
                    Sign Up
                </span>
            </Button>
            <div className="flex justify-center">
                Already have an account? &nbsp;
                <Link href={"/auth/signin"}>
                    <span className="text-blue-500 font-semibold">
                        Sign in
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default SignUpForm
