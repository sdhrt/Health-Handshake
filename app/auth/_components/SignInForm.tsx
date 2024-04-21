"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/use-toast"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import GoogleLogin from "./GoogleLogin"

export const SignInForm = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] =
        useState<boolean>(false)
    const [input, setInput] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setInput((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        ;(() => {
            toast({
                title: "Signing you in...",
            })
        })()
        if (input.email == "" || input.password == "") {
            return toast({
                title: "Missing fields",
                duration: 2000,
                variant: "destructive",
            })
        } else {
            setIsLoading(true)
            const data = await signIn("credentials", {
                ...input,
                callbackUrl: `${window.location.origin}/dashboard`,
                redirect: false,
            })
            setIsLoading(false)
            if (data?.status === 200) {
                router.push("/dashboard")
            } else {
                toast({
                    title: "Couldn't sign in",
                    description: `${data?.error}`,
                    duration: 6000,
                    variant: "destructive",
                })
            }
        }
    }

    // This useEffect attaches an event listener for form to work when pressing enter
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key == "Enter") {
                handleSubmit(e)
            }
        }
        document.addEventListener("keydown", down)
        return () =>
            document.removeEventListener("keydown", down)
    }, [input.email, input.password])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen w-screen">
                <Spinner size={"icon"} />
            </div>
        )
    }
    return (
        <div className="flex flex-col gap-y-4">
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
                    autoComplete="off"
                    onChange={handleChange}
                />
            </div>
            <Button className="mt-4" onClick={handleSubmit}>
                <span className="font-bold">Log in</span>
            </Button>
            <GoogleLogin />
        </div>
    )
}
