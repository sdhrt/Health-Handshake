import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { User } from "@/types/userModelInterface"
import ConnectAlert from "./ConnectAlert"

function OrganizationCard({ org }: { org: User }) {
    return (
        <Card className="last:min-w-[350px]">
                <CardHeader>
                    <CardTitle>{org.name}</CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col gap-y-2">
                    <div className=" flex items-center space-x-4 rounded-md border p-4">
                        <div className="flex-1 space-y-1">
                            <p className="text-sm text-muted-foreground">
                                Industry
                            </p>
                            <p className="text-md font-semibold leading-none">
                                {org.data.industry ? org.data.industry : "..."}
                            </p>
                        </div>
                    </div>
                    <div className=" flex items-center space-x-4 rounded-md border p-4">
                        <div className="flex-1 space-y-1">
                            <p className="text-sm text-muted-foreground">
                                Services
                            </p>
                            {org.data.services ? (
                                Object.values(org.data.services).map(
                                    (service, index) => (
                                        <p
                                            key={index}
                                            className="text-md font-semibold leading-none"
                                        >
                                            {service ? `${service}` : "..."}
                                        </p>
                                    )
                                )
                            ) : (
                                <p className="text-md font-semibold leading-none">
                                    ..
                                </p>
                            )}
                        </div>
                    </div>
                </CardContent>

                <CardFooter>
                    <ConnectAlert org={org} />
                </CardFooter>
        </Card>
    )
}

export default OrganizationCard
