import { Membership, Role } from "@prisma/client"

export type UserProps = {
    email : string
    firstName: string
    lastName: string
    role: Role
    phoneNumber: string
    bankroll: number
    unitSize: number
    membership: Membership
}