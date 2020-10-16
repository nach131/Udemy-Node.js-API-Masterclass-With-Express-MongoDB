import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})

// prisma.query prisma.mutation prisma.subscription prisma.exists

// prisma.query.users(null, '{id name posts {id title}}').then((data) => {
//     console.log(JSON.stringify(data, undefined, 2))
// })

// prisma.query.comments(null, '{id body author{id name}}').then((data)=> {
//     console.log(JSON.stringify(data, undefined, 2))
// })

prisma.mutation.createPost({
    data: {
        title: "Esto esta desactivado",
        body: "",
        published: false,
        author: {
            connect: {
                id: "ckgak0o36006y0736nf4jr7rl"
            }
        }
    }
}, '{id title body published}').then((data) => {
    console.log(data)
    return prisma.query.users(null, '{id name posts { id title}}')
}).then((data) => {
    console.log(JSON.stringify(data, undefined, 2))
})