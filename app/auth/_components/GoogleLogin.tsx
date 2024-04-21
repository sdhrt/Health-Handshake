import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import Image from "next/image"
import React from "react"

function GoogleLogin() {
    const handleSubmit = () => {
        try {
            signIn("google")
        } catch (error) {
            throw error
        }
    }
    return (
        <Button variant={"outline"} onClick={handleSubmit}>
            <Image
                src={"/icons/google.png"}
                height={48}
                width={48}
                alt="google icon"
            />
            <span className="font-bold">
                Continue in with google
            </span>
        </Button>
    )
}

export default GoogleLogin
