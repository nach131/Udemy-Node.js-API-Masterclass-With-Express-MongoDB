
import { GraphQLServer } from 'graphql-yoga'

// Timpos de definiciones (Shema)
const typeDefs = `
    type Query {
    id: ID!
    name : String!
    age: Int!
    employed: Boolean!
    gpa: Float
}
`

//  Resolvers

const resolvers = {
  Query: {
    id() {
      return 'abc123'
    },
    name() {
      return 'Pedro'
    },
    age() {
      return 27
    },
    employed() {
      return true
    },
    gpa() {
      return null
    }
  }}

  const server = new GraphQLServer({
    typeDefs,
    resolvers
  })

server.start(() => {
    console.log('Servidor On-line')
  })