/* This is a database connection function */
import mongoose from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'

const connect = async () => {
  const opts = {
    bufferCommands: false
  }

  await mongoose
    .connect(process.env.NEXT_PUBLIC_MONGODB_URI, opts)
    .then(() => console.log('connected to mongo'))
    .catch((err) => console.log(err))
}

export const connectDB =
  (handler: Function) =>
    async (req: NextApiRequest, res: NextApiResponse, ...restArgs: any[]) => {
      if (mongoose.connections[0].readyState !== 1) {
        await connect()
      }

      return handler(req, res, restArgs)
    }

const db = mongoose.connection
db.once('ready', () =>
  console.log('connected to mongo')
)

export default connectDB
