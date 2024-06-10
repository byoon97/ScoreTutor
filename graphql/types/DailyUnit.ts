import { prisma } from "../../lib/prisma";
import { builder } from "../builder";

builder.prismaObject('DailyUnit', {
    fields: (t) => ({
        id: t.exposeID('id'),
        date: t.expose('date', {
            type: 'Date'
        }),
        netUnits: t.exposeFloat('netUnits'),
        unitCount: t.relation('unitCount')
    })
})

builder.queryField("getDailyUnits", (t) =>
    t.prismaField({
        type: ['DailyUnit'],
        resolve: (query, _parent, _args, _ctx, _info) =>
        prisma.dailyUnit.findMany({ ...query })
    })
)

builder.queryField("getToday", (t) =>
  t.prismaField({
    type: ['DailyUnit'],
    resolve: async (query, _parent, _args, _ctx, _info) => {
      const todayDailyUnit = await prisma.dailyUnit.findFirst({
        orderBy: {
          date: 'desc',
        },
      });

      // Return the result as an array
      return todayDailyUnit ? [todayDailyUnit] : [];
    },
  })
);


builder.mutationField("createDailyUnit", (t) =>
  t.prismaField({
    type: 'DailyUnit',
    args: {
      netUnits: t.arg.float({ required: true }),
    },
    resolve: async (query, _parent, args, ctx) => {
        const { netUnits } = args;
        return await prisma.dailyUnit.create({
          ...query,
          data: {
            netUnits,
            unitCount : {
                connect: {
                    id: 0
                }
            }
          },
        });
      },
  })
)