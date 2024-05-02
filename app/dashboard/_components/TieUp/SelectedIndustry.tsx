"use client"

import { useSession } from "next-auth/react"
import OrganizationCard from "./OrganizationCard"
import { useEffect, useState } from "react"

function SelectedIndustry({
    industry,
    search,
}: {
    industry: string
    search: string
}) {
    const [org, setOrg] = useState<any[]>()
    const { data } = useSession()

    useEffect(() => {
        ;(async () => {
            const response = await fetch(
                "/api/fetch/industry/users",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        industry,
                    }),
                }
            )
            const { data, error } = await response.json()
            if (error) {
                throw error
            }
            setOrg(data)
        })()
    }, [industry])

    return (
        <div>
            <div className="grid grid-cols-3 gap-2">
                {org &&
                    org.map((institute) => {
                        if (
                            data?.user?.email !=
                                institute.email &&
                            institute.name
                                .toLowerCase()
                                .includes(
                                    search.toLowerCase()
                                )
                        ) {
                            return (
                                <div key={institute._id}>
                                    <OrganizationCard
                                        org={institute}
                                    />
                                </div>
                            )
                        }
                    })}
            </div>
        </div>
    )
}

export default SelectedIndustry
