"use client"

import { ChangeEvent, useState } from "react"
import SelectIndustry from "./SelectIndustry"
import SelectedIndustry from "./SelectedIndustry"
import { Input } from "@/components/ui/input"

function TieUp() {
    const [select, setSelect] = useState<string>()

    const handleSelect = (value: string) => {
        setSelect(value)
    }

    const [search, setSearch] = useState<string>("")
    const handleSearch = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setSearch(e.target.value)
    }

    return (
        <div className="mt-6 flex flex-col items-center justify-center gap-4">
            <div className="flex gap-2 items-center justify-center">
                <span className="font-semibold">
                    Tie up with
                </span>
                <SelectIndustry handleFn={handleSelect} />
            </div>
            {select && (
                <div className="flex flex-col items-center">
                    <Input
                        onChange={handleSearch}
                        placeholder="Search..."
                        className="max-w-[180px]"
                    />
                    <SelectedIndustry
                        industry={select}
                        search={search}
                    />
                </div>
            )}
        </div>
    )
}

export default TieUp
