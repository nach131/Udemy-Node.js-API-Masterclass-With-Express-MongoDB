
import { GraphQLServer } from 'graphql-yoga'
import { users, posts, comments } from './datos'

// Timpos de definiciones (Shema)
const typeDefs = `
    type Query {
      me: User!
      users(query: String): [User!]!
      posts(query: String): [Post!]!
      comments: [Comment!]!

}
type User {
  id: ID!
  name: String!
  email: String!
  age: Int
  posts : [Post!]!
}

type Post {
  id: ID!
  title: String!
  body: String!
  published: Boolean!
  author: User!
}
type Comment {
  id: ID!
  body: String!
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
    },

    users(parent, args, ctx, info) {
      if (!args.query) {
        return users
      }
      return users.filter((user) => {
        return user.name.toLocaleLowerCase().includes(args.query.toLocaleLowerCase())
      })
    },

  posts(parent, args, ctx, info) {
    if (!args.query) {
      return posts
    }
    return posts.filter((post) => {
      const isTitleMatch = post.title.toLocaleLowerCase().includes(args.query.toLocaleLowerCase())
      const isBodyMatch = post.body.toLocaleLowerCase().includes(args.query.toLocaleLowerCase())
      return isTitleMatch || isBodyMatch
    })
  },
  comments(parent, args, ctx, info){
    return comments
  }

  },

  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author
      })
    }
  },

  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id
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