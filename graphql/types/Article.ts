import { Article } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { builder } from "../builder";

builder.prismaObject('Article', {
    fields: (t) => ({
        id: t.exposeID('id'),
        createdAt: t.expose("createdAt", {
          type: "Date",
        }),
        imageURL: t.exposeString('ImageURL'),
        league: t.exposeString('League'),
        title: t.exposeString('Title'),
        synopsis: t.exposeString('Synopsis'),
        body: t.exposeString('Body')
    })
  })

builder.queryField("getArticles", (t) =>
  t.prismaField({
    type: ['Article'],
    resolve: async (query, _parent, args, ctx) => {
        return await prisma.article.findMany({...query});
      },
  })
)

builder.queryField("getArticleById", (t) =>
  t.prismaField({
    type: 'Article',
    args: {
        id: t.arg.int({ required: true }),
      },
    resolve: async (_query, _parent, args, _ctx) => {
        const { id } = args
        return prisma.article.findUnique({
            where : {
                id 
            }
        }) as Promise<Article>;
      },
  })
)




