import { ApolloServer } from 'apollo-server-micro'
import { schema } from '../../schemas/server'
import { connectDB } from '../../lib/db-connect'
import Cors from 'micro-cors'

const cors = Cors()

const apolloServer = new ApolloServer({
  schema,
  introspection: process.env.NODE_ENV !== 'production'
})

const startServer = apolloServer.start()

export default connectDB(
  cors(async function handler (req, res) {
    if (req.method === 'OPTIONS') {
      res.end()
      return false
    }

    await startServer
    await apolloServer.createHandler({
      path: '/api/graphql'
    })(req, res)
  })
)

export const config = {
  api: {
    bodyParser: false
  }
}
