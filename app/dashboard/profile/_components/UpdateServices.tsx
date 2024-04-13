"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Plus, Trash } from "lucide-react"
import { useEffect, useState } from "react"

function UpdateServices({ userEmail }: { userEmail: string }) {
    const [input, setInput] = useState<string>()
    const [services, setServices] = useState([])

    useEffect(() => {
        ;(async () => {
            const response = await fetch("/api/fetch/services", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: userEmail,
                }),
            })
            const { data } = await response.json()
            setServices(data.services)
        })()
    }, [])

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const addService = async () => {
        const response = await fetch("/api/update/services", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                service: input,
                email: userEmail,
            }),
        })

        const { data } = await response.json()
        if (data.message) {
            return toast({
                title: data.message,
            })
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mt-10 max-w-[100%]">
                <Label>Service</Label>
                <div className="flex">
                    <Input
                        className="mr-1"
                        onChange={handleChange}
                        placeholder="Add service..."
                    />
                    <Button onClick={addService}>
                        <Plus size={16} />
                    </Button>
                </div>
            </div>

            <div className="flex flex-col items-end">
                <div></div>

                {services &&
                    services.map((service, index) => (
                        <div key={index} className="flex items-center mt-2">
                            <Label className="px-4 text-md">{service}</Label>
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

export default UpdateServices
