const Query = {

  users(parent, args, { prisma }, info) {
    const opArgs = {}

    if (args.query) {
      opArgs.where = {
        OR: [{
          name_contains: args.query
        }, {
          email_contains: args.query
        }]
      }
    }

    return prisma.query.users(opArgs, info)

  },

  posts(parent, args, { prisma }, info) {

    return prisma.query.posts(null, info)

    // if (!args.query) {
    //   return db.posts
    // }

    // return db.posts.filter((post) => {
    //   const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
    //   const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
    //   return isTitleMatch || isBodyMatch
    // })
  },
  comments(parent, args, { db }, info) {
    if (!args.query) {
      return db.comments
    }
  }

}

export { Query as default }