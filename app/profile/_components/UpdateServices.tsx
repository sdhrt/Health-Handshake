"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Plus, Trash } from "lucide-react"
import { useEffect, useState } from "react"

function UpdateServices({
    userEmail,
}: {
    userEmail: string
}) {
    const [input, setInput] = useState<string>("")
    const [services, setServices] = useState([])

    useEffect(() => {
        ;(async () => {
            const response = await fetch(
                "/api/fetch/services",
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
            const { data } = await response.json()
            setServices(data.services)
        })()
    }, [])

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const addService = async () => {
        const response = await fetch(
            "/api/update/services",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    service: input,
                    email: userEmail,
                }),
            }
        )

        const { data } = await response.json()
        if (data.message) {
            setInput("")
            return toast({
                title: data.message,
            })
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mt-2 max-w-[100%]">
                <Label className="text-blue-800">Service</Label>
                <div className="flex">
                    <Input
                        className="mr-1"
                        value={input}
                        onChange={handleChange}
                        placeholder="Add service..."
                    />
                    <Button onClick={addService}>
                        <Plus size={16} />
                    </Button>
                </div>
            </div>
            <div className="flex flex-wrap max-w-[80%] break-all gap-1 mt-1">
                {services &&
                    services.map((service, index) => (
                        <div
                            key={index}
                            className="flex items-center bg-neutral-200 rounded-sm w-fit px-1 gap-1"
                        >
                            <span>{service}</span>
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

export default UpdateServices
