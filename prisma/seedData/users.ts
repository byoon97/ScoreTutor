import { Role } from "@prisma/client";

export const users = [
    {
        id: 0,
        email: 'seanlee@mkabets.com',
        password : 'abc123',
        firstName: 'Sean',
        lastName: 'Lee',
        role: Role.ADMIN,
    },
    {
        id: 1,
        email: 'Maxkim@mkabets.com',
        password : 'abc123',
        firstName: 'Max',
        lastName: 'Kim',
        role: Role.ADMIN,
    },
    {
        id: 2,
        email: 'AngelJiu@mkabets.com',
        password : 'abc123',
        firstName: 'Angel',
        lastName: 'Jiu',
        role: Role.ADMIN,
    },
    {
        id: 3,
        email: 'Byoon5397@gmail.com',
        password : 'abc123',
        firstName: 'Brandon',
        lastName: 'Yoon',
        role: Role.ADMIN,
    },
]


