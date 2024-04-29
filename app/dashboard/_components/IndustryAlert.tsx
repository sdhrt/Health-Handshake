"use client"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { BadgeAlert } from "lucide-react"
import { useEffect, useState } from "react"

function IndustryAlert({ email }: { email: string }) {
    const [industry, setIndustry] = useState<string>()

    useEffect(() => {
        ;(async () => {
            const response = await fetch(
                "/api/fetch/industry",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                    }),
                }
            )
            const { data } = await response.json()
            setIndustry(data.industry)
        })()
    }, [])

    return (
        industry == "" && (
            <Alert>
                <BadgeAlert className="h-4 w-4" />
                <AlertTitle>Set industry</AlertTitle>
                <AlertDescription>
                    Go to your profile in top right and then
                    set Industry in order to filter properly
                </AlertDescription>
            </Alert>
        )
    )
}

export default IndustryAlert
