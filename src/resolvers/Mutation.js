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



  createComment(parent, args, { prisma }, info) {
    return prisma.mutation.createComment({
      data: {
        text: args.data.text,
        author: {
          connect: {
            id: args.data.author
          }
        },
        post: {
          connect: {
            id: args.data.post
          }
        }
      }
    }, info)
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

  updateComment(parent, args, { prisma }, info) {
    return prisma.mutation.updateComment({
      where: {
        id: args.id
      },
      data: args.data
    }, info)
  }
}
export { Mutation as default }