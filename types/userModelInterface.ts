export interface UserData {
    industry: string
    category: string
    location: string
    services: string[]
    contact: string[]
}

export interface User extends Document {
    name: string
    password: string
    email: string
    data: UserData
    isAdmin: boolean
}
