"use client"
import { useEffect, useState } from "react"

type industryType = {
    _id: string
    count: number
}

function InstituteGrid() {
    const [industries, setIndustries] =
        useState<industryType[]>()
    useEffect(() => {
        ;(async () => {
            const response = await fetch(
                "/api/fetch/industry/count"
            )
            const { data, error } = await response.json()
            if (error) {
                throw error
            }
            setIndustries(data)
        })()
    }, [])
    return (
        <div className="grid grid-flow-col w-full gap-4 auto-cols-fr">
            {industries &&
                industries.map((industry, index) => (
                    <div
                        key={index}
                        className="bg-[#cff6ff] rounded-xl px-2 flex flex-1 justify-center"
                    >
                        <div className="flex gap-2 items-center justify-end h-16">
                            <span className="font-semibold text-[#141920] text-4xl">
                                {industry.count}
                            </span>
                            <span className="text-xl">
                                {industry._id}
                            </span>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default InstituteGrid
