"use client"
import WhatsNew from "./WhatsNew"
import OrgsTable from "./OrgsTable"
import { useEffect, useState } from "react"

import { User } from "@/types/userModelInterface"
import Image from "next/image"
export interface Org extends User {
    _id: string
}

function AdminHomepage() {
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
                        category: "admin",
                    }),
                }
            )
            const { data } = await response.json()
            setOrgs(data)
        })()
    }, [])

    return (
        <div className="w-fit ml-10">
            <div className="flex ml-4 justify-between">
                <div className="flex items-center my-4 px-1 rounded-sm">
                    <Image
                        src={
                            "icons/HealthHandshakeSquare.svg"
                        }
                        alt="Icon"
                        width={96}
                        height={96}
                    />
                    <span className="font-bold text-4xl flex flex-col px-1">
                        <span>Health</span>
                        <span>Handshake</span>
                    </span>
                </div>
                <div>
                    {orgs && (
                        <WhatsNew orgs={orgs.slice(0, 5)} />
                    )}
                </div>
            </div>
            <div>{orgs && <OrgsTable orgs={orgs} />}</div>
        </div>
    )
}

export default AdminHomepage
