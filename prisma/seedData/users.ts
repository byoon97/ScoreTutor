import { Role } from "@prisma/client";

export const users = [
    {
        id: 0,
        email: 'seanlee@mkabets.com',
        firstName: 'Sean',
        lastName: 'Lee',
        role: Role.ADMIN,
    },
    {
        id: 1,
        email: 'Maxkim@mkabets.com',
        firstName: 'Max',
        lastName: 'Kim',
        role: Role.ADMIN,
    },
    {
        id: 2,
        email: 'AngelJiu@mkabets.com',
        firstName: 'Angel',
        lastName: 'Jiu',
        role: Role.ADMIN,
    },
    {
        id: 3,
        email: 'Byoon5397@gmail.com',
        firstName: 'Brandon',
        lastName: 'Yoon',
        role: Role.ADMIN,
    },
]


