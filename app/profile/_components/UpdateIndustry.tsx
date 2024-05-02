"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import industries from "@/data/industries"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"

function UpdateIndustry({ userEmail }: { userEmail: string }) {
    const [industry, setIndustry] = useState("")

    useEffect(() => {
        ;(async () => {
            const response = await fetch("/api/fetch/industry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: userEmail,
                }),
            })
            const { data } = await response.json()
            setIndustry(data.industry)
        })()
    }, [])

    const handleSelect = async (value: string) => {
        const response = await fetch("/api/update/industry", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                industryValue: value,
                email: userEmail,
            }),
        })
        const { data } = await response.json()

        return toast({
            title: data.message,
        })
    }
    return (
        <div className="flex items-center justify-between mt-2">
            <Label htmlFor="industry" className="text-blue-800">Select Industry:</Label>
            <Select name="industry" onValueChange={handleSelect}>
                <SelectTrigger className="w-[240px]">
                    <SelectValue
                        placeholder={
                            industry ? `${industry}` : "Select industry"
                        }
                    />
                </SelectTrigger>
                <SelectContent>
                    {industries.map((industryField, index) => (
                        <SelectItem key={index} value={`${industryField}`}>
                            {industryField}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default UpdateIndustry
