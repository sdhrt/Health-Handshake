import { useEffect, useState } from "react"
import OrganizationCard from "./OrganizationCard"
import { User } from "@/types/userModelInterface"
import { useSession } from "next-auth/react"
import { CircleSlash } from "lucide-react"

interface Org extends User {
    _id: string
}

function Organization({
    industry,
    services,
}: {
    industry: string
    services: string[]
}) {
    const [orgs, setOrgs] = useState<any>()
    const { data } = useSession()
    const name = data?.user?.name

    useEffect(() => {
        ;(async () => {
            const response = await fetch("/api/fetch/users", { method: "GET" })
            const responseData = await response.json()
            if (responseData.status == 200) {
                setOrgs(responseData.data)
            } else {
                throw new Error("/api/fetch/users Organization.tsx fetch error")
            }
            // setOrgs(JSON.parse())
        })()
    }, [])

    return (
        <div className="grid grid-col-1 md:grid-cols-3 lg:grid-cols-3 lg:max-w-[60vw] gap-4">
            {name && (
                <div className="hidden last:flex w-screen items-center justify-center lg:justify-start lg:items-start gap-4">
                    <CircleSlash />
                    <span className="text-xl font-bold ">
                        No Organization matches the filter
                    </span>
                </div>
            )}
            {orgs &&
                orgs.map((org: Org) => {
                    if (
                        name != org.name &&
                        (!industry || org.data.industry === industry) &&
                        (services.length == 0 ||
                            services.some((service) =>
                                org.data.services.includes(service)
                            ))
                    ) {
                        return <OrganizationCard org={org} key={org._id} />
                    }
                })}
        </div>
    )
}

export default Organization
