import { TooltipProvider } from "@/components/ui/tooltip"
import Nav from "./_components/nav/Nav"

async function layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <TooltipProvider>
                <Nav />
            </TooltipProvider>
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <div className="sm:hidden sm:text-2xl font-bold grid place-items-center h-screen">
                    View in desktop
                </div>
                {children}
            </div>
        </>
    )
}

export default layout
