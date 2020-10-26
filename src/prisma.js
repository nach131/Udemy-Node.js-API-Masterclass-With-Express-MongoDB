import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})

export { prisma as default}

//--------------
// COMPROBAR SI EXITE
//---------------

// prisma.exists.Comment({
//     id: "ckgamibh801280736hvcca5zj",
//     "author": {
//         "id": "ckgamckdd00y9073645ub8k2m"
//     }
// }).then((existe) => {
//     console.log(existe)
// })


//--------------
// CREA UN POST
//---------------
// 1. Crear nuevo post
// 2. Fetch todo la info de los usuarios

// const createPostForUser = async (authorId, data) => {
//     const userExits = await prisma.exists.User({ id: authorId })

//     if (!userExits) {
//         throw new Error('Usuario no encontrado')
//     }

//     const post = await prisma.mutation.createPost({
//         data: {
//             ...data,
//             author: {
//                 connect: {
//                     id: authorId
//                 }
//             }
//         }
//     }, '{author { id name email posts {id title published}}}')

//     return post.author
// }
//-------------------------------------

// SE EJECUTA LA CREACION DEL POST
// createPostForUser('ckgamckdd00y9073645ub8k2m', {
//     title: 'Titulo creado de Node',
//     body: 'Lorem imsum',
//     published: true
// }).then((user) => {
//     console.log(JSON.stringify(user, undefined, 2))
// }).catch((error) => {
//     console.log(error.message)
// })




//--------------
// UPDATE UN POST
//---------------

// const updatePostForUser = async (postId, data) => {
//     const postExits = await prisma.exists.Post({ id: postId })

//     if (!postExits) {
//         throw new Error('El post no existe')
//     }

//     const post = await prisma.mutation.updatePost({
//         where: {
//             id: postId
//         },
//         data
//     }, '{author { id name posts { id title published }}}')
    
//     return post.author
// }
//-------------------------------------

// EJECUTA EL UPDATE

// updatePostForUser("ckgg926qt04y20736uyf75efv", { title: "Upadete Node Prisma", published: false }).then((user) => {
//     console.log(JSON.stringify(user, undefined, 2))
// }).catch((error) => {
//     console.log(error.message)
// })

