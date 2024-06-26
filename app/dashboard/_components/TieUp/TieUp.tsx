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
        <div className="mt-14 flex flex-col justify-center gap-4">
            <div className="flex flex-col gap-2 items-center">
                <div className="font-semibold text-blue-700 text-xl">
                    Love to tie up with
                </div>
                <SelectIndustry handleFn={handleSelect} />
            </div>
            {select && (
                <div className="flex flex-col items-center">
                    <Input
                        onChange={handleSearch}
                        placeholder="Search by name..."
                        className="max-w-[180px] border-2 border-black"
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
