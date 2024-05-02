"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"

function UpdateLocation({
    userEmail,
}: {
    userEmail: string
}) {
    const [input, setInput] = useState()
    const [location, setLocation] = useState<string>()

    useEffect(() => {
        ;(async () => {
            const response = await fetch(
                "/api/fetch/location",
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
            setLocation(data.location)
        })()
    }, [])

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const changeLocation = async () => {
        if (input) {
            const response = await fetch(
                "/api/update/location",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        location: input,
                        email: userEmail,
                    }),
                }
            )
            const { data } = await response.json()

            if (response.ok) {
                return toast({
                    title: data.message,
                })
            }
        }
    }

    return (
        <div className="flex justify-between items-center mt-2">
            <Label className="text-blue-800">Location</Label>
            <Input
                className="w-[240px]"
                onChange={handleChange}
                onBlur={changeLocation}
                placeholder={
                    location
                        ? `${location}`
                        : "Set a location..."
                }
            />
        </div>
    )
}

export default UpdateLocation
