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
