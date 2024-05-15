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
      result: t.exposeString('result')
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
        result: t.arg.string({required: true})
    },
  resolve: async (query, _parent, args, ctx) => {
      const { startTime, homeTeam, homeTeamLogo, awayTeam, awayTeamLogo, pick, unit, result } = args;
      return await prisma.pick.create({
        ...query,
        data: {
            startTime, awayTeam, homeTeam, awayTeamLogo, homeTeamLogo, pick, unit, result
        }
      });
    },
})
)
