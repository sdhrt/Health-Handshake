import { User } from "@/types/userModelInterface"
import React from "react"

export interface Org extends User {
    _id: string
}

function WhatsNew({ orgs }: { orgs: Org[] }) {
    return (
        <div className="border w-fit m-4 p-4 rounded-sm bg-[#fffffe]">
            <h1 className="font-semibold text-xl text-blue-500">
                What's new
            </h1>
            <ul>
                {orgs &&
                    orgs.map((org) => {
                        return (
                            <li key={org._id}>
                                <span className="font-semibold">
                                    {org.name}
                                </span>{" "}
                                <span className="text-muted-foreground">
                                    just joined
                                </span>
                            </li>
                        )
                    })}
            </ul>
        </div>
    )
}

export default WhatsNew
