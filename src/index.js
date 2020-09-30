
import { GraphQLServer } from 'graphql-yoga'

// Timpos de definiciones (Shema)
const typeDefs = `
    type Query {
      greeting(name: String): String!
      add(a: Float!, b: Float!): Float!
      me: User!
      posts: Post!

}
type User {
  id: ID!
  name: String!
  email: String!
  age: Int
}

type Post {
  id: ID!
  title: String!
  body: String!
  published: Boolean!
}

`

//  Resolvers

const resolvers = {
  Query: {
    add(parent, args, ctx, info) {
      console.log(args.a, args.b)
      return args.a + args.b

    },

    greeting(parent, args, ctx, info) {
      console.log(args)
      if (args.name) {
        return `Holaaa, ${args.name}`
      } else {
        return 'Holiii sin nombre'
      }
    },
    me() {
      return {
        id: 'abc123',
        name: 'Pedro',
        email: 'pedro@gmail.com',
        age: 50
      }
    },
    posts() {
      return {
        id: 'der2445',
        title: 'El titulo del post',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, nostrum. Sapiente tempore eius debitis vero, facilis nisi at suscipit magnam veniam quasi quibusdam, exercitationem dicta, quas natus commodi mollitia quos!',
        published: true
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