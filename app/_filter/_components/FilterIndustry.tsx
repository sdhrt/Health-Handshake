"use client"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import industries from "@/data/industries"

function FilterIndustry({
    setIndustry,
}: {
    setIndustry: (arg: string) => void
}) {
    const handleIndustryChange = (value: string) => {
        setIndustry(value)
    }
    return (
        <div>
            <Select onValueChange={handleIndustryChange}>
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter industry..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Industry</SelectLabel>
                        {industries.map((industry, index) => (
                            <SelectItem value={industry} key={index}>
                                {industry}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default FilterIndustry
