"use client"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import PendingConnection from "./PendingConnection"
import AcceptedConnection from "./AcceptedConnection"
import { useSession } from "next-auth/react"

function Connections() {
    const { data } = useSession()
    return (
        <div className="flex flex-col">
            <span className="text-xl font-bold">
                Connections
            </span>
            <div className="mt-2">
                <Tabs defaultValue="accepted" className="">
                    <TabsList>
                        <TabsTrigger value="accepted">
                            Accepted
                        </TabsTrigger>
                        <TabsTrigger value="pending">
                            Pending
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="accepted">
                        <AcceptedConnection
                            email={
                                data?.user?.email as string
                            }
                        />
                    </TabsContent>
                    <TabsContent value="pending">
                        <PendingConnection
                            email={
                                data?.user?.email as string
                            }
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default Connections
