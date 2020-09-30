
import { GraphQLServer } from 'graphql-yoga'

// Timpos de definiciones (Shema)
const typeDefs = `
    type Query {
      me: User!
}
type User {
  id: ID!
  name: String!
  email: String!
  age: Int
}
`

//  Resolvers

const resolvers = {
  Query: {
    me() {
      return {
        id: 'abc123',
        name: 'Pedro',
        email: 'pedro@gmail.com',
        age: 50
      }
    }
  }

}


const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => {
  console.log('Servidor On-line')
})