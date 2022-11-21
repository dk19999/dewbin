
import PasteQuery from './paste/query'
import PasteMutation from './paste/mutation'


export const resolvers =  {
    Query:{
      ...PasteQuery
    },
    Mutation:{
        ...PasteMutation
    },
}
