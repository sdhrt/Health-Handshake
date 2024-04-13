"use client"

import { useState } from "react"

import FilterIndustry from "./FilterIndustry"
import FilterServices from "./FilterServices"
import Organization from "./Organization"

export default function Homepage() {
    const [industry, setIndustry] = useState<string>()
    const [services, setServices] = useState<string[]>([])

    return (
        <div className="p-4 md:p-10 flex flex-col lg:flex-row gap-10">
            <div className="lg:max-w-[30%] flex flex-col items-center gap-10">
                <FilterIndustry setIndustry={setIndustry} />
                <FilterServices setServices={setServices} />
            </div>
            <Organization
                industry={industry as string}
                services={services as string[]}
            />
        </div>
    )
}
