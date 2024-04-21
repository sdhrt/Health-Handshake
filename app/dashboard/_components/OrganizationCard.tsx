import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { User } from "@/types/userModelInterface"
import ConnectAlert from "./ConnectAlert"

function OrganizationCard({ org }: { org: User }) {
    return (
        <Card className="shadow-lg w-64 min-w-64 my-1 hover:scale-[1.02] hover:transition">
            <CardHeader>
                <CardTitle className="break-all">
                    {org.name}
                </CardTitle>
                {org.bio && (
                    <CardDescription className="text-muted-foreground text-sm tracking-tight max-h-[80px] overflow-y-scroll">
                        {org.bio}
                    </CardDescription>
                )}
            </CardHeader>

            <CardContent className="flex flex-col gap-y-1">
                <div className=" flex items-center rounded-md border p-2 border-[#aeb9cc]">
                    <div className="flex-1 space-y-1">
                        <p className="text-sm text-muted-foreground">
                            Industry
                        </p>
                        <p className="text-md font-semibold leading-none">
                            {org.data.industry ? (
                                org.data.industry
                            ) : (
                                <span className="text-sm text-muted-foreground">
                                    Not set
                                </span>
                            )}
                        </p>
                    </div>
                </div>
                <div className=" flex items-center rounded-md border p-2 border-[#aeb9cc]">
                    <div className="flex-1 space-y-1">
                        <p className="text-sm text-muted-foreground">
                            Services
                        </p>
                        <div>
                            <span className="hidden last:block text-sm text-muted-foreground font-semibold">
                                No services
                            </span>
                            {org.data.services &&
                                Object.values(
                                    org.data.services
                                ).map((service, index) => (
                                    <p
                                        key={index}
                                        className="text-md font-semibold leading-none"
                                    >
                                        {service
                                            ? `${service}`
                                            : "..."}
                                    </p>
                                ))}
                        </div>
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
