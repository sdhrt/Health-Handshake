"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Plus, Trash } from "lucide-react"
import { useEffect, useState } from "react"

function UpdateContact({ userEmail }: { userEmail: string }) {
    const [input, setInput] = useState<string>()
    const [contact, setContact] = useState<string[]>()

    useEffect(() => {
        ;(async () => {
            const response = await fetch("/api/fetch/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: userEmail,
                }),
            })
            const responseData = await response.json()
            setContact(responseData.data.contact)
        })()
    }, [])

    const handleChange = (e: any) => {
        setInput(e.target.value)
    }

    const addContact = async () => {
        const response = await fetch("/api/update/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contact: input,
                email: userEmail,
            }),
        })

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
            <div className="flex justify-between items-center mt-10 max-w-[100%]">
                <Label>Contact</Label>
                <div className="flex">
                    <Input
                        className="mr-1"
                        onChange={handleChange}
                        placeholder="Add number..."
                    />
                    <Button onClick={addContact}>
                        <Plus size={16} />
                    </Button>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <div></div>

                {contact &&
                    contact.map((num, index) => (
                        <div key={index} className="flex items-center mt-2">
                            <Label className="px-4 text-md">{num}</Label>
                            <Button
                                onClick={() =>
                                    toast({
                                        title: "Functionality not implemented",
                                    })
                                }
                            >
                                <Trash className="" size={16} />
                            </Button>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default UpdateContact
