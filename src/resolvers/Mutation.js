import { v4 as uuidv4 } from 'uuid';

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const emailTaken = await prisma.exists.User({ email: args.data.email })

    if (emailTaken) {
      throw new Error('Email taken.')
    }
    return prisma.mutation.createUser({ data: args.data }, info)

  },

  async deleteUser(parent, args, { prisma }, info) {
    const userExists = await prisma.exists.User({ id: args.id })

    if (!userExists) {
      throw new Error('Usuario no encontrado')
    }

    return prisma.mutation.deleteUser({ where: { id: args.id } }, info)

  },

  updateUser(parent, args, { db }, info) {
    const { id, data } = args
    const user = db.users.find((user) => user.id === id)

    if (!user) {
      throw new Error('Usuario no encontrado')
    }

    if (typeof data.email === 'string') {
      const emailTaken = db.users.some((user) => user.email === data.email)

      if (emailTaken) {
        throw new Error('Email taken')
      }

      user.email = data.email
    }

    if (typeof data.name === 'string') {
      user.name = data.name
    }

    if (typeof data.age !== 'undefined') {
      user.age = data.age
    }
    return user
  },

  createPost(parent, args, { db, pubsub }, info) {
    const userExists = db.users.some((user) => user.id === args.data.author)

    if (!userExists) {
      throw new Error('Usuario no encontrado')
    }

    const post = {
      id: uuidv4(),
      ...args.data
    }
    db.posts.push(post)

    if (args.data.published) {
      pubsub.publish('post', {
        post: {
          mutation: 'CREADO ESTE POST',
          data: post
        }
      })
    }
    return post
  },
  deletePost(parent, args, { db, pubsub }, info) {
    const postIndex = db.posts.findIndex((post) => post.id === args.id)
    if (postIndex === -1) {
      throw new Error('Post no encontrado')
    }
    const [post] = db.posts.splice(postIndex, 1)

    db.comments = db.comments.filter((comment) => comment.post !== args.id)

    if (post.published) {
      pubsub.publish('post', {
        post: {
          mutation: 'ESTE POST FUE BORRADO',
          data: post
        }
      })
    }

    return post
  },

  updatePost(parent, args, { db, pubsub }, info) {
    const { id, data } = args
    const post = db.posts.find((post) => post.id === id)
    const originalPost = { ...post }

    if (!post) {
      throw new Error('Post no encontrado')
    }

    if (typeof data.title === 'string') {
      post.title = data.title
    }

    if (typeof data.body === 'string') {
      post.body = data.body
    }

    if (typeof data.published === 'boolean') {
      post.published = data.published

      if (originalPost.published && !post.published) {
        //deleted
        pubsub.publish('post', {
          post: {
            mutation: 'BORRADO',
            data: originalPost
          }
        })

      } else if (!originalPost.published && post.published) {
        // Creado
        pubsub.publish('post', {
          post: {
            mutation: 'CREADO',
            data: post
          }
        })

      }
    } else if (post.published) {
      // updated
      pubsub.publish('post', {
        post: {
          mutation: 'ACTUALIZADO',
          data: post
        }
      })
    }

    return post
  },



  createComment(parent, args, { db, pubsub }, info) {
    const userExists = db.users.some((user) => user.id === args.data.author) // esto es lo mismo pero reducido
    const postExists = db.posts.some((post) => {
      return post.id === args.data.post && post.published === true
    })

    if (!userExists || !postExists) {
      throw new Error('No se a encontrado Usuario y Post')
    }
    const comment = {
      id: uuidv4(),
      ...args.data
    }
    db.comments.push(comment)
    pubsub.publish(`comment ${args.data.post}`, {
      comment: {
        mutation: 'CREADO',
        data: comment
      }
    })
    return comment
  },

  deleteComment(parent, args, { db, pubsub }, info) {
    const commentIndex = db.comments.findIndex((comment) => comment.id === args.id)

    if (commentIndex === -1) {
      throw new Error('Comentario no encontrado')
    }

    const [deletedComment] = db.comments.splice(commentIndex, 1)
    pubsub.publish(`comment ${deletedComment.post}`, {
      comment: {
        mutation: 'BORRADO',
        data: deletedComment
      }
    })
    return deletedComment
  },

  updateComment(parent, args, { db, pubsub }, info) {
    const { id, data } = args
    const comment = db.comments.find((comment) => comment.id === id)

    if (!comment) {
      throw new Error("Commentario no encontrado")
    }

    if (typeof data.body === 'string') {
      comment.body = data.body
    }
    pubsub.publish(`comment ${comment.post}`, {
      comment: {
        mutation: 'ACTUALIZADO',
        data: comment
      }
    })
    return comment
  }
}
export { Mutation as default }