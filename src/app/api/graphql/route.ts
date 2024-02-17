import { NextApiRequest, NextApiResponse } from 'next'
import { createYoga } from 'graphql-yoga'
import { schema } from '../../../../graphql/schema'
import { createContext } from '../../../../graphql/context'

const { handleRequest } = createYoga<{
    req: NextApiRequest
    res: NextApiResponse
  }>({
    graphqlEndpoint: '/graphql',
    schema,
    context: createContext,
    fetchAPI: {
        Request,
        Response
    }
})

export { handleRequest as GET, handleRequest as POST}