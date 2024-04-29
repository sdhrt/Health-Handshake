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
        <div className="grid grid-cols-3 gap-1">
            {industries &&
                industries.map((industry, index) => (
                    <div
                        key={index}
                        className="bg-blue-300 rounded-sm p-1 flex justify-center"
                    >
                        <div className="flex gap-2 items-center justify-end h-24">
                            <span className="font-semibold text-[#141520] text-4xl">
                                {industry.count}
                            </span>
                            <span className="text-xl ">
                            {industry._id}
                            </span>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default InstituteGrid
