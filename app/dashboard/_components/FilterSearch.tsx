"use client"

import { Input } from "@/components/ui/input"
import { ChangeEvent } from "react"

function FilterSearch({
    setSearch,
}: {
    setSearch: (arg: string) => void
}) {
    const handleChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setSearch(e.target.value)
    }

    return (
        <div>
            <Input
                onChange={handleChange}
                placeholder="Search for companies.."
            />
        </div>
    )
}

export default FilterSearch
