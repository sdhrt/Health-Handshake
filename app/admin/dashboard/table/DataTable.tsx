"use client"

import React, { ChangeEvent, useState } from "react"
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
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

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
                title: `Couldn't delete the request`,
            })
            throw data.error
        } else {
            toast({
                title: `${data.message}`,
            })
        }
    }

    const handleApprove = async (id: Types.ObjectId) => {
        const response = await fetch(
            "/api/connect/adminApprove",
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

    const [search, setSearch] = useState("")

    const handleChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setSearch(e.target.value)
    }

    return (
        <div>
            <div className="flex justify-end">
                <Input
                    onChange={handleChange}
                    placeholder="Search..."
                    className="max-w-[300px] m-1 border-black border-2"
                />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Approved</TableHead>
                        <TableHead>Sender</TableHead>
                        <TableHead>Reciever</TableHead>
                        <TableHead>Content</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Delete</TableHead>
                        <TableHead>Approve</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data &&
                        data.map((tData) => {
                            if (
                                tData.sender
                                    .toLowerCase()
                                    .includes(
                                        search.toLowerCase()
                                    ) ||
                                tData.reciever
                                    .toLowerCase()
                                    .includes(
                                        search.toLowerCase()
                                    ) ||
                                tData.content
                                    .toLowerCase()
                                    .includes(
                                        search.toLowerCase()
                                    )
                            )
                                return (
                                    <TableRow
                                        key={tData._id}
                                        className={cn(
                                            !tData.adminApprove &&
                                                "bg-green-100 hover:bg-green-300",
                                            tData.adminApprove &&
                                                "bg-gray-200"
                                        )}
                                    >
                                        <TableCell>
                                            {tData.adminApprove
                                                ? "approved"
                                                : "not approved"}
                                        </TableCell>
                                        <TableCell>
                                            {tData.sender}
                                        </TableCell>
                                        <TableCell>
                                            {tData.reciever}
                                        </TableCell>
                                        <TableCell className="max-w-[40ch]">
                                            <div className="overflow-y-scroll hidden-scroll max-h-12">
                                                {
                                                    tData.content
                                                }
                                            </div>
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
                                                    tData.adminApprove
                                                }
                                                onClick={() =>
                                                    handleApprove(
                                                        tData._id
                                                    )
                                                }
                                            >
                                                <CheckIcon
                                                    className="h-4 w-4"
                                                    fontSize={
                                                        14
                                                    }
                                                />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                        })}
                </TableBody>
            </Table>
        </div>
    )
}

export default DataTable
