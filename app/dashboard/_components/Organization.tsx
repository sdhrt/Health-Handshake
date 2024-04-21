import { useEffect, useState } from "react"
import { User } from "@/types/userModelInterface"
import InstituteOrg from "./InstituteOrg"
import HealthOrg from "./HealthOrg"
import { Separator } from "@/components/ui/separator"

export interface Org extends User {
    _id: string
}

function Organization({
    search,
    industry,
    services,
    category,
}: {
    search: string
    industry: string
    services: string[]
    category: string
}) {
    const [orgs, setOrgs] = useState<Org[]>()

    useEffect(() => {
        ;(async () => {
            const response = await fetch(
                "/api/fetch/users",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        category: category,
                    }),
                }
            )
            const responseData = await response.json()
            if (responseData.status == 200) {
                setOrgs(responseData.data)
            } else {
                throw new Error(
                    "/api/fetch/users Organization.tsx fetch error"
                )
            }
        })()
    }, [])

    return (
        <div className="w-screen flex justify-evenly h-screen">
            {category == "health" && (
                <>
                    <div className="flex flex-col">
                        <span className="text-2xl font-semibold py-4">
                            Institutes
                        </span>
                        <InstituteOrg
                            orgs={orgs as Org[]}
                            search={search}
                            category={category}
                            industry={industry}
                            services={services}
                        />
                    </div>
                    <Separator orientation="vertical" />
                </>
            )}
            <div className="flex flex-col items-center">
                <span className="text-2xl font-semibold py-4">
                    Health
                </span>
                <HealthOrg
                    orgs={orgs as Org[]}
                    search={search}
                    category={category}
                    industry={industry}
                    services={services}
                />
            </div>
        </div>
    )
}

export default Organization
