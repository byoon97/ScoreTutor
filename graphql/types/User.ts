import { User } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { builder } from "../builder";
import { getAuth0Token } from "@/util/tokenManager";
import axios from 'axios';

builder.prismaObject('User', {
  fields: (t) => ({
    id: t.exposeID('id'),
    createdAt: t.expose("createdAt", {
      type: "Date",
    }),
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
    bankroll: t.exposeInt('bankroll', {
      nullable: true
    }),
    unitSize: t.exposeInt('unitSize', {
      nullable: true
    }),
    role: t.expose('role', { type: Role, }),
    membership: t.relation('membership', {
      nullable: true
    }),
    emailNotifs: t.exposeBoolean('emailNotifs'),
    telegramId: t.exposeString('telegramId', {
      nullable: true
    }),
    telegramToken: t.exposeString('telegramId', {
      nullable: true
    }),
    discordId: t.exposeString('telegramId', {
      nullable: true
    }),
  })
})

const Role = builder.enumType('Role', {
  values: ['USER', 'ADMIN'] as const,
})

builder.mutationField("updateUser", (t) =>
  t.prismaField({
    type: 'User',
    args: {
      email: t.arg.string({ required: true}),
      firstName: t.arg.string({ required: true }),
      lastName: t.arg.string({ required: true }),
      phoneNumber: t.arg.string({ required: true}),
      unitSize: t.arg.int({required: true}),
      bankroll: t.arg.int({required: true}),
      emailNotifs: t.arg.boolean({required: true}),
    },
    resolve: async (query, _parent, args, ctx) => {
      const { email, firstName, lastName, phoneNumber, unitSize, bankroll, emailNotifs } = args
      return prisma.user.update({
        where: {
          email: email,
        },
       
        data: {
          firstName, lastName, phoneNumber, unitSize, bankroll, emailNotifs
        },
        ...query,
      })
    }
  })
)

builder.mutationField("updateTelegramToken", (t) =>
  t.prismaField({
    type: 'User',
    args: {
      email: t.arg.string({ required: true}),
      telegramToken: t.arg.string({required: true})
    },
    resolve: async (query, _parent, args, ctx) => {
      const { email, telegramToken } = args
      return prisma.user.update({
        where: {
          email: email,
        },
       
        data: {
          telegramToken
        },
        ...query,
      })
    }
  })
)

builder.queryField("getUserByEmail", (t) => 
  t.prismaField({
    type: 'User',
    args : {
      email: t.arg.string({ required: true }),
    },
    resolve: (_query, _parent, args, _ctx, _info) => {
      const { email } = args;
      return prisma.user.findUnique({
        where: {
          email
        }
      }) as Promise<User>; 
    }
  })
)

