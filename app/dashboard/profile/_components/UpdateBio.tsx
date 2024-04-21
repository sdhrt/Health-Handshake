"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"

function UpdateBio({ userEmail }: { userEmail: string }) {
    const [input, setInput] = useState()

    useEffect(() => {
        ;(async () => {
            const response = await fetch("/api/fetch/bio", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: userEmail,
                }),
            })
            const { data } = await response.json()
            setInput(data)
        })()
    }, [])

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const changeBio = async () => {
        if (input) {
            const response = await fetch(
                "/api/update/bio",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        bio: input,
                        email: userEmail,
                    }),
                }
            )
            const { data, error } = await response.json()
            if (error) {
                toast({
                    title: "Couldn't update bio",
                    description: "Please try again later",
                })
                return
            }

            if (response.ok) {
                return toast({
                    title: data.message,
                })
            }
        }
    }

    return (
        <div className=" flex flex-col mt-2 gap-1">
            <Label
                htmlFor="Bio"
                className="ml-1 flex text-md"
            >
                Bio
            </Label>
            <div className="flex flex-col  items-end gap-1">
                <Textarea
                    placeholder={
                        input
                            ? `${input}`
                            : `Update your bio`
                    }
                    className="h-[10vh] text-muted-foreground focus:text-black"
                    value={input}
                    onChange={handleChange}
                />
                <Button
                    className="float-right"
                    onClick={changeBio}
                    variant={"outline"}
                    size={"sm"}
                >
                    Update bio
                </Button>
            </div>
        </div>
    )
}

export default UpdateBio
