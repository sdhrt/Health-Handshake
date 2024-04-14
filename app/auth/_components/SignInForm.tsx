"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/use-toast"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

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
                callbackUrl: `${window.location.origin}`,
                redirect: false,
            })
            if (data?.error) {
                toast({
                    title: "Invalid credentials",
                    description: `${data?.error}: Your email or password doesn't match`,
                    duration: 6000,
                })
                setIsLoading(false)
            } else {
                setIsLoading(false)
                router.push("/dashboard")
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
            <Button
                className="mt-4"
                onClick={(e) => handleSubmit(e)}
            >
                <span className="font-bold">Log in</span>
            </Button>
        </div>
    )
}
