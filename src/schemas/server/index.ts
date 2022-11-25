
import PasteQuery from './paste/query'
import PasteMutation from './paste/mutation'
import { GraphQLScalarType, Kind, ValueNode} from 'graphql'

const DateTime = new GraphQLScalarType({
  name:'Date',
  description:'A valid date',
  parseValue: (value:any) =>  {
    console.log("🚀 ~ file: index.ts ~ line 17 ~ value", value)
    return new Date(value) // value from the client
  },
  serialize: (value:any) => {
    console.log("🚀 ~ file: index.ts ~ line 21 ~ serialize", value)
    const date = new Date(value)
    return date.toISOString()
  },
  parseLiteral: (ast:ValueNode) => {
    if (ast.kind === Kind.INT) {
      console.log(new Date(+ast.value))
      return new Date(+ast.value) // ast value is always in string format
    }
    return null
  }

})




export const resolvers =  {
    Query:{
      ...PasteQuery
    },
    Mutation:{
        ...PasteMutation
    },
    DateTime:DateTime
}
