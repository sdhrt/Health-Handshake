import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectLabel,
    SelectGroup,
} from "@/components/ui/select"

import React from "react"
import industries from "@/data/industries"

function SelectIndustry({
    handleFn,
}: {
    handleFn: (value: string) => void
}) {
    return (
        <Select onValueChange={handleFn}>
            <SelectTrigger className="w-48">
                <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Industries</SelectLabel>
                    {industries.map((industry, index) => (
                        <SelectItem
                            value={industry}
                            key={index}
                        >
                            {industry}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default SelectIndustry
