import { ApolloServer } from 'apollo-server-micro';
import { addResolversToSchema } from '@graphql-tools/schema';
import { loadSchemaSync } from "@graphql-tools/load";
import  {GraphQLFileLoader} from "@graphql-tools/graphql-file-loader";
import { connectDB } from '../../lib/db-connect';
import { NextApiRequest, NextApiResponse } from 'next';

const schema = loadSchemaSync("**/*.graphql", {
  loaders: [new GraphQLFileLoader()],
});

const schemaWithResolvers =  addResolversToSchema({
  schema,
  resolvers:{}
});

const apolloServer = new ApolloServer({ schema: schemaWithResolvers, introspection:true  });

const startServer = apolloServer.start()

async function handler(req:NextApiRequest, res:NextApiResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://studio.apollographql.com'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }

  await startServer
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
}
export const config = {
  api: {
    bodyParser: false
  }
};


export default connectDB(handler)