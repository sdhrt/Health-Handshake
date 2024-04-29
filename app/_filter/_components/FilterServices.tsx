"use client"
import { useEffect, useState } from "react"

import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Input } from "@/components/ui/input"

function FilterServices({
    setServices,
}: {
    setServices: (arg: string[]) => void
}) {
    const [filterServices, setFilterServices] =
        useState<string[]>()

    const [search, setSearch] = useState<string>("")

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
        <div className="">
            <h4 className="font-semibold mb-2">
                Filter by services
            </h4>
            <Input
                className="mb-2"
                placeholder="Search for services.."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <ToggleGroup
                type="multiple"
                className="flex flex-col items-start"
                onValueChange={handleChange}
            >
                {filterServices &&
                    filterServices.map(
                        (
                            service: string,
                            index: number
                        ) => {
                            if (
                                service
                                    .toLowerCase()
                                    .includes(
                                        search.toLowerCase()
                                    )
                            ) {
                                return (
                                    <ToggleGroupItem
                                        variant={"outline"}
                                        size={"sm"}
                                        value={service}
                                        key={index}
                                        aria-label={service}
                                        className="truncate"
                                        asChild
                                    >
                                        <div>{service}</div>
                                    </ToggleGroupItem>
                                )
                            }
                        }
                    )}
            </ToggleGroup>
        </div>
    )
}

export default FilterServices
