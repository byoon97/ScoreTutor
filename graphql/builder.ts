import SchemaBuilder from "@pothos/core";
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import { DateResolver } from "graphql-scalars";
import { prisma } from "../lib/prisma";
import { createContext } from './context'

export const builder = new SchemaBuilder<{
  Scalars: {
    Date: { Input: Date; Output: Date };
  };
  PrismaTypes: PrismaTypes
  Context: ReturnType<typeof createContext>,

}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  }
})

builder.queryType({
  fields: (t) => ({
    ok: t.boolean({
      resolve: () => true,
    }),
  }),
});

builder.mutationType({})
builder.addScalarType("Date", DateResolver, {});