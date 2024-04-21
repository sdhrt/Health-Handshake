"use client"

import { useEffect, useState } from "react"

import FilterIndustry from "./FilterIndustry"
import FilterServices from "./FilterServices"
import Organization from "./Organization"
import FilterSearch from "./FilterSearch"
import UpdateCategoryDrawer from "../profile/_components/UpdateCategoryDrawer"
import { useSession } from "next-auth/react"
import { Spinner } from "@/components/ui/spinner"
import { Separator } from "@/components/ui/separator"

export default function Homepage() {
    const { data, status } = useSession()
    const userEmail = data?.user?.email

    const [search, setSearch] = useState<string>("")
    const [industry, setIndustry] = useState<string>()
    const [services, setServices] = useState<string[]>([])
    const [category, setCategory] = useState<string>("")

    useEffect(() => {
        ;(async () => {
            const response = await fetch(
                "/api/fetch/category",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: data?.user?.email,
                    }),
                }
            )
            const { data: res } = await response.json()
            if (res) {
                setCategory(res.category)
            }
        })()
    }, [userEmail])

    if (status === "loading") {
        return (
            <div className="flex h-screen items-center justify-center">
                <Spinner size={"icon"} />
            </div>
        )
    }

    if (!category) {
        return (
            <div className="flex w-screen h-screen items-center justify-center">
                <UpdateCategoryDrawer />
            </div>
        )
    }

    return (
        <div className="flex flex-row w-screen ">
            <div className="flex flex-col gap-4 px-2 border-r-2">
                <div className="flex flex-col pt-2 gap-2 ">
                    <FilterSearch setSearch={setSearch} />
                    <FilterIndustry
                        setIndustry={setIndustry}
                    />
                </div>
                <Separator orientation="horizontal" />
                <FilterServices setServices={setServices} />
            </div>
            <Organization
                search={search as string}
                industry={industry as string}
                services={services as string[]}
                category={category as string}
            />
        </div>
    )
}
