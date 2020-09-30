
import { GraphQLServer } from 'graphql-yoga'

// Timpos de definiciones (Shema)
const typeDefs = `
    type Query {
    id: ID!
    title : String!
    price: Float!
    releaseYear: Int
    rating: Float
    inStock: Boolean!
}
`

//  Resolvers

const resolvers = {
  Query: {
    id() {
      return 'abc123'
    },
    title() {
      return 'Boligrafo'
    },
    price() {
      return 12.99
    },
    releaseYear() {
      return null
    },
    rating() {
      return 50
    },
    inStock() {
      return true
    }
  }}

  const server = new GraphQLServer({
    typeDefs,
    resolvers
  })

server.start(() => {
    console.log('Servidor On-line')
  })