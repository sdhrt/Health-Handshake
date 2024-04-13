import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Home() {
    const session = await getServerSession(authOptions)
    return (
        <div>
            <h1>Hello from main</h1>
            {session ? redirect('/dashboard') : redirect('/auth/signin')}
        </div>
    )
}
