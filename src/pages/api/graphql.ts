import { ApolloServer } from "apollo-server-micro";
import { addResolversToSchema } from "@graphql-tools/schema";
import { resolvers } from "../../schemas/server";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { connectDB } from "../../lib/db-connect";
import Cors from "micro-cors";

const cors = Cors();

const schema = loadSchemaSync("../../schemas/server/**/*.graphql", {
  loaders: [new GraphQLFileLoader()],
});

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});

const apolloServer = new ApolloServer({
  schema: schemaWithResolvers,
  introspection: true,
});

const startServer = apolloServer.start();

export default connectDB(
  cors(async function handler(req, res) {
    if (req.method === "OPTIONS") {
      res.end();
      return false;
    }

    await startServer;
    await apolloServer.createHandler({
      path: "/api/graphql",
    })(req, res);
  })
);

export const config = {
  api: {
    bodyParser: false,
  },
};
