import { prisma } from "../../lib/prisma";
import { builder } from "../builder";


builder.prismaObject('Membership', {
    fields: (t) => ({
      expiresAt: t.expose('expiresAt', {
        type: "Date",
        nullable: true
      }),
      user: t.relation('user')
    })
  })

builder.mutationField("createMembership", (t) =>
  t.prismaField({
    type: 'Membership',
    args: {
      expiresAt: t.arg.string({ required: true }),
      userId: t.arg.int({ required: true })
    },
    resolve: async (query, _parent, args, ctx) => {
        const { userId, expiresAt } = args;
        return await prisma.membership.create({
          ...query,
          data: {
            expiresAt,
            user: {
              connect: {
                id: userId, // Correctly link the user by ID
              },
            },
          },
        });
      },
  })
)