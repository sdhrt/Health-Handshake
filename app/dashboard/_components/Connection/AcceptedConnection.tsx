"use client"

import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"

interface User {
    name: string
    email: string
    content: string
    contact: string[]
}

function AcceptedConnection({ email }: { email: string }) {
    const [connection, setConnection] = useState<User[]>()

    useEffect(() => {
        ;(async () => {
            const response = await fetch(
                "/api/connect/fetch/org/accepted",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                    }),
                }
            )
            const { data, error } = await response.json()
            if (error) {
                toast({
                    title: `${error}`,
                })
            } else {
                setConnection(data)
            }
        })()
    }, [])

    if (!connection) {
        return (
            <div className="grid place-items-center">
                <Spinner size={"lg"} />
            </div>
        )
    }

    return (
        <div className="w-full">
            <Label>Accepted</Label>
            <Separator orientation="horizontal" />
            <div className="hidden last:block mt-2">
                No connections request accepted. See pending
                tab...
            </div>
            {connection &&
                connection.map((con) => (
                    <div
                        key={con.email}
                        className="border p-1 mt-1"
                    >
                        <div className="text-md">
                            <span className="font-semibold">
                                {con.name}
                            </span>{" "}
                            has accepted your request to
                            connect. You connected with{" "}
                            {con.name} for {con.content}
                        </div>
                        <div>
                            <div>
                                <Label>Email: </Label>
                                <span className="font-semibold">
                                    {con.email}
                                </span>
                            </div>
                            <div>
                                <Label>Number: </Label>
                                <div className="text-muted-foreground flex flex-col text-sm">
                                    <div className="hidden last:block text-xs">
                                        Not avaiable
                                    </div>
                                    {con.contact.map(
                                        (number) => (
                                            <span>
                                                {number}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default AcceptedConnection
