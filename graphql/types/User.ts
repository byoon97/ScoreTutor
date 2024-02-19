import { User } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { builder } from "../builder";

builder.prismaObject('User', {
  fields: (t) => ({
    id: t.exposeID('id'),
    email: t.exposeString('email'),
    firstName: t.exposeString('firstName' , {
      nullable: true
    }),
    lastName: t.exposeString('lastName' , {
      nullable: true
    }),
    phoneNumber: t.exposeString('phoneNumber', {
      nullable: true
    }),
    role: t.expose('role', { type: Role, }),
    membership: t.relation('membership')
  })
})

const Role = builder.enumType('Role', {
  values: ['USER', 'ADMIN'] as const,
})

builder.mutationField("updateUser", (t) =>
  t.prismaField({
    type: 'User',
    args: {
      email: t.arg.string({ required: true }),
      firstName: t.arg.string({ required: true }),
      lastName: t.arg.string({ required: true }),
      phoneNumber: t.arg.string({ required: true})
    },
    resolve: async (query, _parent, args, ctx) => {
      const { email, firstName, lastName, phoneNumber } = args
      return prisma.user.update({
        where: {
          email: email,
        },
       
        data: {
          email, firstName, lastName, phoneNumber
        },
        ...query,
      })
    }
  })
)

builder.queryField("getUserByID", (t) => 
  t.prismaField({
    type: 'User',
    args : {
      id: t.arg.int({ required: true }),
    },
    resolve: (_query, _parent, args, _ctx, _info) => {
      const { id } = args;
      return prisma.user.findUnique({
        where: {
          id
        }
      }) as Promise<User>; 
    }
  })
)

