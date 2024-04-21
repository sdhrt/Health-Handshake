"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Check } from "lucide-react"

function OrgsTable({ orgs }: { orgs: any[] }) {
    return (
        <div className="m-4 border p-4 w-fit rounded-md">
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
                                        {org.data.category}
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
