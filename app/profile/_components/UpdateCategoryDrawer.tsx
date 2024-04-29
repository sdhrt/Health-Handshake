"use client"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

function UpdateCategoryDrawer() {
    const session = useSession()
    const router = useRouter()
    const [cat, setCat] = useState<string>("")
    const handleChange = (value: string) => {
        setCat(value)
    }

    const handleSubmit = async () => {
        if (cat?.length > 1) {
            const response = await fetch(
                "/api/update/category",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        category: cat,
                        email: session.data?.user?.email,
                    }),
                }
            )
            const { data } = await response.json()
            toast({
                title: data.message,
                description:
                    "Please refresh the page if you're not being redirected",
            })
            router.push("/dashboard")
        }
    }
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant={"secondary"}>
                    Set Category to continue
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <div className="w-screen flex items-center justify-center flex-col mt-2 mb-2">
                        <DrawerTitle>
                            Set category
                        </DrawerTitle>
                        <DrawerDescription>
                            You need to set category in
                            order to continue
                        </DrawerDescription>
                    </div>
                </DrawerHeader>
                <DrawerFooter>
                    <div className="w-screen flex items-center justify-center flex-col mb-10 gap-4">
                        <Select
                            onValueChange={handleChange}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>
                                        Category
                                    </SelectLabel>
                                    <SelectItem value="health">
                                        Health
                                    </SelectItem>
                                    <SelectItem value="institute">
                                        Institute
                                    </SelectItem>
                                    <SelectItem
                                        value="government"
                                        disabled
                                    >
                                        Government
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <DrawerClose asChild>
                            <Button
                                onClick={handleSubmit}
                                variant={"secondary"}
                            >
                                Continue
                            </Button>
                        </DrawerClose>
                    </div>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default UpdateCategoryDrawer
