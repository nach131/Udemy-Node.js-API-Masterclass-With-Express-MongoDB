import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})


// 1. Crear nuevo post
// 2. Fetch todo la info de los usuarios

const createPostForUser = async (authorId, data) => {
    const post = await prisma.mutation.createPost({
        data: {
            ...data,
            author: {
                connect: {
                    id: authorId
                }
            }
        }
    }, '{id}')
    const user = await prisma.query.user({
        where: {
            id: authorId
        }
    }, '{id name email posts {id title published}}')
    return user
}
// SE EJECUTA LA CREACION DEL POST
// createPostForUser('ckgamtgyk016b07364e6mxdwq', {
//     title: 'Titulo creado de Node',
//     body: 'Lorem imsum',
//     published: true
// }).then((user) => {
//     console.log(JSON.stringify(user, undefined, 2))
// })




//--------------
// UPDATE UN POST
//---------------

const updatePostForUser = async (postId, data) => {
    const post = await prisma.mutation.updatePost({
        where: {
            id: postId
        },
        data
    }, '{author { id}}')
    const user = await prisma.query.user({
        where: {
            id: post.author.id
        }
    }, '{is name email posts {id title published}}')
    return user
}

// EJECUTA EL UPDATE

updatePostForUser("ckgamtguz016a073644fprb63", { published: false }).then((user)=> {
    console.log(JSON.stringify(user, undefined,2))
})

