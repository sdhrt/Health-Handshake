"use client"

import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Check } from "lucide-react"
import React, { ChangeEvent } from "react"

function OrgsTable({ orgs }: { orgs: any[] }) {
    const [search, setSearch] = React.useState<string>("")

    const handleChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setSearch(e.target.value)
    }
    return (
        <div className="m-4 border p-4 w-fit rounded-md">
            <div className="flex justify-end">
                <Input
                    onChange={handleChange}
                    placeholder="Search..."
                    className="max-w-[300px] m-1 border-black border-2"
                />
            </div>
            <Table>
                <TableHeader className="">
                    <TableRow>
                        <TableHead>S.no</TableHead>
                        <TableHead>Admin</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Joined</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orgs &&
                        orgs.map((org, index) => {
                            if (
                                org.name
                                    .toLowerCase()
                                    .includes(
                                        search.toLowerCase()
                                    )
                            )
                                return (
                                    <TableRow key={org._id}>
                                        <TableCell>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>
                                            {org.isAdmin && (
                                                <Check />
                                            )}
                                        </TableCell>
                                        <TableCell className="text-blue-500 font-semibold">
                                            {org.name}
                                        </TableCell>
                                        <TableCell>
                                            {org.email}
                                        </TableCell>
                                        <TableCell>
                                            {
                                                org.data
                                                    .category
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {new Date(
                                                org.createdAt
                                            ).toLocaleString(
                                                "en-GB",
                                                {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                }
                                            )}
                                        </TableCell>
                                    </TableRow>
                                )
                        })}
                </TableBody>
            </Table>
        </div>
    )
}

export default OrgsTable
