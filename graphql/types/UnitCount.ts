import { prisma } from "../../lib/prisma";
import { builder } from "../builder";

builder.prismaObject('UnitCount', {
    fields: (t) => ({
        id: t.exposeID('id'),
        netUnits: t.exposeFloat('netUnits'),
    })
})

builder.queryField("getUnitCount", (t) =>
    t.prismaField({
        type: ['UnitCount'],
        resolve: (query, _parent, _args, _ctx, _info) =>
        prisma.unitCount.findMany({ ...query })
    })
)