import { CircleX } from "lucide-react"

function page() {
    return (
        <div className="flex h-screen w-screen justify-center items-center flex-col gap-5">
            <CircleX className="h-48 w-48 text-red-500" />
            <span className="font-bold text-4xl">
                Settings page
            </span>
            <span className="font-bold text-4xl">
                (Working on it)
            </span>
        </div>
    )
}

export default page
