import { v4 as uuidv4 } from 'uuid';

const Mutation = {
  async createUser(parent, args, { prisma }, info) {

    return prisma.mutation.createUser({ data: args.data }, info)

  },

  async deleteUser(parent, args, { prisma }, info) {

    return prisma.mutation.deleteUser({ where: { id: args.id } }, info)

  },

  async updateUser(parent, args, { prisma }, info) {
    return prisma.mutation.updateUser({
      where: {
        id: args.id
      },
      data: args.data
    }, info)

  },

  createPost(parent, args, { prisma }, info) {
    return prisma.mutation.createPost({
      data: {
        title: args.data.title,
        body: args.data.body,
        published: args.data.published,
        author: {
          connect: {
            id: args.data.author
          }
        }
      }
    }, info)
  },
  deletePost(parent, args, { prisma }, info) {

    return prisma.mutation.deletePost({
      where: {
        id: args.id
      }
    }, info)

  },

  updatePost(parent, args, { prisma }, info) {
    return prisma.mutation.updatePost({
      where: {
        id: args.id
      }, data: args.data
    }, info)

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