import Link from "next/link"

async function Admin() {
    return (
        <div>
            <Link href="/admin/dashboard" prefetch>
                <span className="m-4 text-2xl font-bold">
                    Go to dashboard
                </span>
            </Link>
        </div>
    )
}

export default Admin
