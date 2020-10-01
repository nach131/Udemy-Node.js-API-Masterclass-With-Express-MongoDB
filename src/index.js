
import { GraphQLServer } from 'graphql-yoga'
import { users, posts } from './datos'

// Timpos de definiciones (Shema)
const typeDefs = `
    type Query {
     users(query: String): [User!]!
      me: User!
      posts(query: String): [Post!]!

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
  author: User!
}

`

//  Resolvers

const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users
      }
      return users.filter((user) => {
        return user.name.toLocaleLowerCase().includes(args.query.toLocaleLowerCase())
      })
    },
    me() {
      return {
        id: 'abc123',
        name: 'Pedro',
        email: 'pedro@gmail.com',
        age: 50
      }
    },

    posts(parents, args, ctx, info) {
      if (!args.query) {
        return posts
      }
      return posts.filter((post) => {
        const isTitleMatch = post.title.toLocaleLowerCase().includes(args.query.toLocaleLowerCase())
        const isBodyMatch = post.body.toLocaleLowerCase().includes(args.query.toLocaleLowerCase())
        return isTitleMatch || isBodyMatch
      })
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author
      })
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