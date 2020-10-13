## Query de users
{
  users(query: "") {
    id
    name
    email
    age
    comments {
      id
      body
    }
  }
}


## Query de post
{
  posts(query: "") {
    id
    title
    body
    published
    comments {
      id
      body
    }
  }
}


----------------------------------

## Crear un usuario
mutation {
  createUser(name: "Piki", email:"piku@gmail.com"){
    id
    posts{
      id
    }
  }
}

## Crear un post se necesita el id del usuario creado antes

mutation {
  createPost(
    title: "Titulo creado"
    body: ""
    published: false
    author: "d37bb4b6-bc65-42b3-a0d6-e65342d7c9d1"
  ) {
    id
    title
    body
    published
    author {
      name
    }
    comments {
      id
    }
  }
}

## Crear comentrario de un post
mutation {
  createComment(
    body: "Comentario de krilin"
    author: "af138d5e-a872-4ace-aa0e-12c1d920ac40"
    post: "7a073311-b36d-4c18-83b4-4ec850b449d4"
  ) {
    id
    body
  }
}

----------------------------------
mutation {
  updateUser(id: "1", data: { name: "Cort Perit", email: "cor@gmail.com", age: 123 }) {
    id
    name
    email
    age
  }
}