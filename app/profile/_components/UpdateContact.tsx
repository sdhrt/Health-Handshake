"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"

function UpdateContact({
    userEmail,
}: {
    userEmail: string
}) {
    const [input, setInput] = useState<string>("")
    const [contact, setContact] = useState<string[]>()

    useEffect(() => {
        ;(async () => {
            const response = await fetch(
                "/api/fetch/contact",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: userEmail,
                    }),
                }
            )
            const responseData = await response.json()
            setContact(responseData.data.contact)
        })()
    }, [])

    const handleChange = (e: any) => {
        setInput(e.target.value)
    }

    const addContact = async () => {
        const numRegex = /^(\+977)?(9[678]\d{8})$/
        const landLineRegex = /(\d{8})/
        if (
            !numRegex.test(input) ||
            !landLineRegex.test(input)
        ) {
            toast({
                title: "Invalid phone numbers",
            })
            return
        }
        const response = await fetch(
            "/api/update/contact",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contact: input,
                    email: userEmail,
                }),
            }
        )

        const responseData = await response.json()

        if (response.ok) {
            setInput("")
            return toast({
                title: responseData.data.message,
            })
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mt-2">
                <Label>Contact</Label>
                <div className="flex">
                    <Input
                        value={input}
                        className="mr-1"
                        onChange={handleChange}
                        placeholder="Add number..."
                    />
                    <Button onClick={addContact}>
                        <Plus size={16} />
                    </Button>
                </div>
            </div>
            <div className="flex flex-wrap max-w-[80%] break-all gap-1 mt-1">
                {contact &&
                    contact.map((num, index) => (
                        <div
                            key={index}
                            className="flex items-center bg-neutral-200 rounded-sm w-fit px-1 gap-1"
                        >
                            <span>{num}</span>
                            <div
                                className="hover:cursor-pointer font-bold text-red-900"
                                onClick={() =>
                                    toast({
                                        title: "Functionality not implemented",
                                    })
                                }
                            >
                                x
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default UpdateContact
