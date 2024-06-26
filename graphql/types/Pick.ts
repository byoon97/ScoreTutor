import { Inter } from 'next/font/google';
import { prisma } from "../../lib/prisma";
import { builder } from "../builder";

builder.prismaObject('Pick', {
    fields: (t) => ({
      id: t.exposeID('id'),
      createdAt: t.expose("createdAt", {
        type: "Date",
    }),
      startTime: t.exposeString('startTime'),
      homeTeam: t.exposeString('homeTeam'),
      awayTeam: t.exposeString('awayTeam'),
      awayTeamLogo: t.exposeString('awayTeamLogo'),
      homeTeamLogo: t.exposeString('homeTeamLogo'),
      pick: t.exposeString('pick'),
      unit: t.exposeFloat('unit'),
      result: t.exposeString('result'),
      leagueLogo: t.exposeString('leagueLogo', {
        nullable: true
      }),
      eventId: t.exposeString('eventId', {
        nullable: true
      }),
      status: t.exposeString('status'),
      toWin: t.exposeFloat('toWin'),
      net: t.exposeFloat('net')
    })
  })

  builder.queryField("getPicks", (t) =>
  t.prismaField({
    type: ['Pick'],
    resolve: (query, _parent, _args, _ctx, _info) =>
      prisma.pick.findMany({ ...query })
  })
)


builder.mutationField("createPick", (t) =>
    t.prismaField({
     type: 'Pick',
     args: {
        startTime: t.arg.string({required: true}),
        homeTeam: t.arg.string({required: true}),
        awayTeam: t.arg.string({required: true}),
        homeTeamLogo: t.arg.string({required: true}),
        awayTeamLogo: t.arg.string({required: true}),
        pick: t.arg.string({required: true}),
        unit: t.arg.float({required: true}),
        result: t.arg.string({required: true}),
        leagueLogo: t.arg.string({required:true}),
        eventId: t.arg.string({required:true}),
        status: t.arg.string({required:true}),
        toWin: t.arg.float({required:true}),
        net: t.arg.float({required:true}),

    },
  resolve: async (query, _parent, args, ctx) => {
      const { net, startTime, homeTeam, homeTeamLogo, awayTeam, awayTeamLogo, pick, unit, result, leagueLogo,eventId, toWin, status } = args;
      return await prisma.pick.create({
        ...query,
        data: {
            net, startTime, awayTeam, homeTeam, awayTeamLogo, homeTeamLogo, pick, unit, result, leagueLogo,eventId, toWin, status
        }
      });
    },
})
)

builder.mutationField("updatePick", (t) => 
  t.prismaField({
    type: 'Pick',
    args: {
      id: t.arg.int({required: true}),
      status: t.arg.string({required: true}),
      result: t.arg.string({required: true}),
      net: t.arg.float({required: true}),

    },
    resolve: async (query, _parent, args, ctx) => {
      const { id, status, result, net } = args
      return prisma.pick.update({
        where : {
          id: id
        },

        data: {
          status, result, net
        },
        ...query
      })
    }
  })
)
