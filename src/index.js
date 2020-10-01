
import { GraphQLServer } from 'graphql-yoga'

// Demo user data
const users = [{
  id: '1',
  name: 'Pedro',
  email: 'pedro@gmail.com',
  age: 27
}, {
  id: '2',
  name: 'Bulma',
  email: 'bulma@gmail.com'
},
{
  id: '3',
  name: 'Pablo',
  email: 'Pablo@gmail.com'
}
]


// Timpos de definiciones (Shema)
const typeDefs = `
    type Query {
     users(query: String): [User!]!
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
    users(parents, args, ctx, info) {
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