"use client"
import { useEffect, useState } from "react"

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"

function FilterServices({
    setServices,
}: {
    setServices: (arg: string[]) => void
}) {
    const [filterServices, setFilterServices] =
        useState<string[]>()

    useEffect(() => {
        ;(async () => {
            const response = await fetch(
                "/api/fetch/services",
                {
                    method: "GET",
                }
            )
            const { data } = await response.json()
            setFilterServices(data)
        })()
    }, [])

    const handleChange = (value: string[]) => {
        setServices(value)
    }

    return (
        <div className="p-4 border border-gray-200 rounded-md max-h-[60vh] overflow-y-scroll shadow hover:shadow-inner  hover:shadow-gray-200/60 md:max-h-none">
            <h4 className="flex justify-center font-semibold">
                Filter by services
            </h4>
            <ToggleGroup
                type="multiple"
                className="grid md:grid-cols-5 lg:grid-cols-3 gap-4 mt-4"
                onValueChange={handleChange}
            >
                {filterServices &&
                    filterServices.map(
                        (
                            service: string,
                            index: number
                        ) => (
                            <ToggleGroupItem
                                value={service}
                                key={index}
                                aria-label={service}
                                className="text-xs tracking-tight block overflow-hidden hover:overflow-visible"
                            >
                                {service}
                            </ToggleGroupItem>
                        )
                    )}
            </ToggleGroup>
        </div>
    )
}

export default FilterServices
