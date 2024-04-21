"use client"

import React from "react"
import {
    Table,
    TableHeader,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
    CheckIcon,
    Cross2Icon,
} from "@radix-ui/react-icons"
import { Types } from "mongoose"
import { toast } from "@/components/ui/use-toast"

function DataTable() {
    const [data, setData] = React.useState<any[]>([])
    React.useEffect(() => {
        ;(async () => {
            const response = await fetch(
                "/api/connect/fetch"
            )
            const responseData = await response.json()
            setData(responseData.data)
        })()
    }, [data])

    const handleReject = async (id: Types.ObjectId) => {
        const response = await fetch(
            "/api/connect/reject",
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
                title: "Request has been approved",
                description: `Connection request between ${data.sender} and ${data.reciever} has been approved`,
            })
        }
    }

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Approved</TableHead>
                        <TableHead>Sender</TableHead>
                        <TableHead>Reciever</TableHead>
                        <TableHead>Content</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Reject</TableHead>
                        <TableHead>Approve</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data &&
                        data.map((tData) => (
                            <TableRow key={tData._id}>
                                <TableCell>
                                    {tData.approved
                                        ? "true"
                                        : ""}
                                </TableCell>
                                <TableCell>
                                    {tData.sender}
                                </TableCell>
                                <TableCell>
                                    {tData.reciever}
                                </TableCell>
                                <TableCell>
                                    {tData.content}
                                </TableCell>
                                <TableCell>
                                    {new Date(
                                        tData.createdAt
                                    ).toLocaleString(
                                        "en-GB",
                                        {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        }
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant={
                                            "destructive"
                                        }
                                        onClick={() =>
                                            handleReject(
                                                tData._id
                                            )
                                        }
                                    >
                                        <Cross2Icon />
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        className="bg-green-400"
                                        disabled={
                                            tData.approved
                                        }
                                        onClick={() =>
                                            handleApprove(
                                                tData._id
                                            )
                                        }
                                    >
                                        <CheckIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default DataTable
