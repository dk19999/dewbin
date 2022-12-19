import { QueryResolvers } from '../../../generated/server-graphql'
import PasteModel from '../../../models/paste'
const Query: QueryResolvers = {
  pastes: async (_, __, { db }) => {
    const pastes = await PasteModel.find({})
    console.log('🚀 ~ file: query.ts ~ line 8 ~ pastes: ~ pastes', pastes)
    return pastes
  },
  recentPastes: async (_, __, { db }) => {
    const recentPastes = await PasteModel.find({ exposure: 'PUBLIC' }).sort('-createdAt').limit(20)

    console.log(
      '🚀 ~ file: query.ts ~ line 8 ~ recentPastes: ~ recentPastes',
      recentPastes
    )
    return recentPastes
  },
  paste: async (parent, args, { db }) => {
    const { link } = args
    console.log('🚀 ~ file: query.ts ~ line 12 ~ paste: ~ link', link)
    const currentDate = new Date()
    console.log(
      '🚀 ~ file: query.ts ~ line 14 ~ paste: ~ currentDate',
      currentDate
    )
    const paste = await PasteModel.findOne({ link })
    console.log('🚀 ~ file: query.ts ~ line 16 ~ paste: ~ paste', paste)
    // if(currentDate >= paste.)
    if (paste && paste.expireAt <= currentDate) {
      console.log(
        '🚀 ~ file: query.ts ~ line 18 ~ paste: ~ paste.expireAt',
        paste.expireAt
      )
      paste.isDeleted = true
      await paste.save()
      // await PasteModel.findOneAndRemove({link});
      return null
    }
    return paste
  }
}

export default Query
