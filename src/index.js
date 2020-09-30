
import { GraphQLServer } from 'graphql-yoga'

// Timpos de definiciones (Shema)
const typeDefs = `
type Query {
  hello: String!
  name: String!
  location: String!
  bio: String!
}
`

//  Resolvers

const resolvers = {
  Query: {
    hello() {
      return 'Esto sale de reolvers'
    },
    name() {
      return 'Mi nombre es pedro'
    },
    location(){
      return 'Barcelona'
    },
    bio(){
      return 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas alias maxime quidem, assumenda, nam aperiam minima repudiandae rem accusantium incidunt aliquid delectus ipsa molestias doloribus? Dolor nostrum quas inventore consectetur!'
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