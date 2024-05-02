"use client"

import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Types } from "mongoose"
import { toast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"

type connectionType = {
    recieve: any[]
    sent: any[]
}

function PendingConnection({ email }: { email: string }) {
    const [connection, setConnection] =
        useState<connectionType>()

    useEffect(() => {
        ;(async () => {
            const response = await fetch(
                "/api/connect/fetch/org/pending",
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
            const { data } = await response.json()
            setConnection(data)
        })()
    }, [])

    const handleApprove = async (id: Types.ObjectId) => {
        const response = await fetch(
            "/api/connect/approve",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                }),
            }
        )
        const { data } = await response.json()
        if (data.error) {
            toast({
                title: `${data.error}`,
            })
        } else {
            toast({
                title: `${data.message}`,
            })
        }
    }

    if (!connection) {
        return (
            <div className="flex justify-center items-center">
                <Spinner size={"lg"} />
            </div>
        )
    }
    return (
        <div className="">
            <div>
                <Label>Recieved</Label>
                <Separator orientation="horizontal" />
                <div className="text-sm text-muted-foreground hidden last:block">
                    No connection request recieved
                    pending...
                </div>
                {connection.recieve &&
                    connection.recieve.map((con) => (
                        <div
                            key={con._id}
                            className="border border-blue-400 my-1 p-2 rounded-sm"
                        >
                            <div>
                                <Label>
                                    Requested by:{" "}
                                </Label>
                                <span className="font-semibold">
                                    {con.sender}
                                </span>
                            </div>
                            <div>
                                <span>
                                    For: {con.content}
                                </span>
                            </div>
                            <div>
                                <Label>
                                    Approved by you:{" "}
                                </Label>
                                {con.approved ? (
                                    <span>Approved</span>
                                ) : (
                                    <Button
                                        onClick={() =>
                                            handleApprove(
                                                con._id
                                            )
                                        }
                                        variant={"outline"}
                                        size={"sm"}
                                    >
                                        Approve
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
            </div>
            <div>
                <Label>Sent</Label>
                <Separator orientation="horizontal" />
                <div className="text-sm text-muted-foreground hidden last:block">
                    No connection request sent pending...
                </div>
                {connection.sent &&
                    connection.sent.map((con) => (
                        <div
                            key={con._id}
                            className="border border-blue-400 my-1 p-2 rounded-sm"
                        >
                            <div className="">
                                <Label>Sent to: </Label>
                                <span className="font-semibold">
                                    {con.reciever}
                                </span>
                            </div>
                            <div>
                                <Label>
                                    Approved by admin:{" "}
                                </Label>
                                <span>
                                    {con.adminApprove
                                        ? "approved"
                                        : "not approved"}
                                </span>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default PendingConnection
