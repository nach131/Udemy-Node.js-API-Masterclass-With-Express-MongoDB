
import { GraphQLServer } from 'graphql-yoga'
import { users, posts, comments } from './datos'
import { v4 as uuidv4 } from 'uuid';

// Timpos de definiciones (Shema)
const typeDefs = `
    type Query {
      me: User!
      users(query: String): [User!]!
      posts(query: String): [Post!]!
      comments: [Comment!]!
}

type Mutation {
    createUser(name: String!, email: String!, age: Int): User!
}


type User {
  id: ID!
  name: String!
  email: String!
  age: Int
  posts : [Post!]!
  comments: [Comment!]!
}

type Post {
  id: ID!
  title: String!
  body: String!
  published: Boolean!
  author: User!
  comments: [Comment!]!
}
type Comment {
  id: ID!
  body: String!
  author: User!
  post: Post!
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
    comments(parent, args, ctx, info) {
      if (!args.query) {
        return comments
      }
    }

  },
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some((user) => user.email === args.email)
      if (emailTaken) {
        throw new Error('Email taken.')
      }
      const user = {
        id: uuidv4(),
        name: args.name,
        email: args.email,
        age: args.age
      }
      users.push(user)
      return user
    }
  },

  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author
      })
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.post === parent.id
      })
    }
  },

  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id
      })
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.author === parent.id
      })
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author
      })
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => {
        return post.id === parent.post
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