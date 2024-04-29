import DataTable from "./table/DataTable"
async function AdminDash() {
    return (
        <div>
            <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex ml-64">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            Welcome back!
                        </h2>
                        <p className="text-muted-foreground">
                            Here&apos;s a list of connection
                            requests
                        </p>
                    </div>
                </div>
                <DataTable />
            </div>
        </div>
    )
}

export default AdminDash
