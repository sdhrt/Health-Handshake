import { useSession } from "next-auth/react"
import { Org } from "./Organization"
import OrganizationCard from "./OrganizationCard"
import { cn } from "@/lib/utils"

function HealthOrg({
    orgs,
    search,
    industry,
    services,
    category,
}: {
    orgs: Org[]
    search: string
    industry: string
    services: string[]
    category: string
}) {
    const { data } = useSession()
    const name = data?.user?.name

    return (
        <div
            className={cn(
                category == "institute" &&
                    "grid grid-cols-3 gap-2"
            )}
        >
            {orgs &&
                orgs.map((org: Org) => {
                    const industryFilter =
                        !industry ||
                        org.data.industry === industry
                    const servicesFilter =
                        services.length == 0 ||
                        services.some((service) =>
                            org.data.services.includes(
                                service
                            )
                        )
                    if (
                        org.data.category == "health" &&
                        !org.isAdmin &&
                        name != org.name &&
                        industryFilter &&
                        servicesFilter &&
                        org.name
                            .toLowerCase()
                            .includes(search.toLowerCase())
                    ) {
                        return (
                            <OrganizationCard
                                org={org}
                                key={org._id}
                            />
                        )
                    }
                })}
        </div>
    )
}

export default HealthOrg
