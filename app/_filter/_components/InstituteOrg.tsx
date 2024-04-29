import { useSession } from "next-auth/react"
import { Org } from "./Organization"
import OrganizationCard from "./OrganizationCard"

function InstituteOrg({
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
        <div className="">
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
                        org.data.category == "institute" &&
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

export default InstituteOrg
