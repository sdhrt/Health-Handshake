"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { useSession } from "next-auth/react"
import { useState } from "react"

function UpdateInfo() {
    const { data: session } = useSession()

    const [input, setInput] = useState({
        name: "",
        email: "",
    })

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setInput((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (input.name == "" && input.email == "") {
            return
        }

        const response = await fetch("/api/update/info", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...input,
                userEmail: session?.user?.email,
            }),
        })
        const { data } = await response.json()

        if (data.message) {
            return toast({
                title: data.message,
                description:
                    "Changes has been made and you will see it when logging in next time",
                duration: 4000,
            })
        }
    }
    return (
        <div>
            <div className="flex flex-col px-4 py-6 gap-y-2 bg-neutral-100 rounded-lg">
                <div className="flex items-center">
                    <Label className="text-nowrap min-w-[50%]">
                        Organization Name
                    </Label>
                    <Input
                        name="name"
                        type="text"
                        placeholder={`${session?.user?.name}`}
                        className="border-none hover:outline"
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </div>
                <div className="flex items-center">
                    <Label className="text-nowrap min-w-[50%]">
                        Organization Email
                    </Label>
                    <Input
                        name="email"
                        type="email"
                        placeholder={`${session?.user?.email}`}
                        className="border-none hover:outline"
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </div>
                <Button className="" onClick={handleSubmit}>
                    <span className="font-semibold">
                        Update
                    </span>
                </Button>
            </div>
        </div>
    )
}

export default UpdateInfo
