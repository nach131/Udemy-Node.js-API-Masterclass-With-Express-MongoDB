# Udemy - The Modern GraphQL Bootcamp (Advanced Node.js)

<span style="color:red">**informatica/00_Lynda/\_GraphQL/**</span>

---

## 2.5. Setting up Babel

https://babeljs.io/

Instalacion de dependencias

Inicio creacion GraphQL servere (solo mensaje)

## 2.6. ES6 ImportExport

export desde un archivo importado en el index

exportar con una propiedad

## 2.7. Creating Your Own GraphQL API

Toda la documentacion:

https://spec.graphql.org/

https://github.com/prisma-labs/graphql-yoga

## 2.8. GraphQL Scalar Types

Diferentes tipos de datos

String, Boolean, Int, Float,I D

## 9. Live Reload for GraphQL-Yoga

Instar Modemon

## 2.10. Creating Custom Types

Type me,

## 2.11. Operation Arguments

Query con propiedades

Sumar las propiedades que delara el usuario

## 2.12. Working with Arrays Part I

Para reducir una array en un valor simple

https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/reduce

reducer()

## 2.13. Working with Arrays Part II

Query Filtrando nombre del usuario en la array

## 2.14. Relational Data Basics

realacionar simple

## 2.15. Relational Data Arrays

Relaciones de usuarios y Posts

## 2.16. Comment Challenge Part I

## 2.17. Comment Challenge Part II\

relaciones entre comment y usuarios

## 2.18. Comment Challenge Part III

Relacines comment con post

# 3 Basic Mutations

## 3.2. Creating Data with Mutations Part I

npm uuid (General id)

https://www.npmjs.com/package/uuid

Crea un usuario

## 3.3. Creating Data with Mutations Part II

createPost y creatComment

## 3.4. The Object Spread Operator with Node.js

https://www.npmjs.com/package/babel-plugin-transform-object-rest-spread

npm install --save-dev babel-plugin-transform-object-rest-spread

Copia propiedades de un objeto a otro facil

## 3.5. The Input Type

Crean CreateUserInput, CreatePostInput, CreateCommentinput y las data

## 3.6. Deleting Data with Mutations Part I

Borrado de Usuario, con sus posts y comentarios

## 3.7. Deleting Data with Mutations Part II

Borrar un post y borrar comment

## 3.8. A Pro GraphQL Project Structure Part I

Organizar proyecto,
Separacion Scheme y db los datos

Configurar nodemo para ejecute schema.graphql

## 3.9. A Pro GraphQL Project Structure Part II

Separar los resolver en archivos

## 3.10. Updating Data with Mutations Part I

Update User

## 3.11. Updating Data with Mutations Part II

Update Post y UpdateComent

# 4. Basics Subscriptions

## 4.1. Section Intro GraphQL Basics Subscriptions

Descripción de lo tema

## 4.2. GraphQL Subscription Basics

Crea subscription count, cuenta +1 cada segundo

## 4.3. Setting up a Comments Subscription

De la subcripcion anterior escucha cadad vez que alguien hace un comentario en un post

## 4.4. Setting up a Posts Subscription

Subcripcion cuando unn nuevo post se ha creado

## 4.5. Expanding the Posts Subscription for Edits and Deletions

Subcripción cuando se actualiza los datos del post,

Cuando se published: false or true

## 4.6. Expanding the Comments Subscription for Edits and Deletions

Subscripción cunado se crea, actualiza o se borra un comentario

# 5. Database Storage with Prisma

## 5.3. Prisma Mac Setup

Crea una app en Heroku, crea BD postgressql, pgadmin, instalar docker

## 5.6. Prisma 101

npm install -g prisma

prisma init prisma

Dentro de la carpeta prisma

docker-compose up -d

prisma deploy

http://localhost:4466/

## 5.7. Exploring the Prisma GraphQL API

Crea un usuario, elimina usuario

## 5.8. Add Post type to Prisma

Crear Mutacition Post, Query...

## 5.9. Adding Comment Type to Prisma

Crear comment

## 5.10. Integrating Prisma into a Node.js Project

npm install prisma-binding

https://github.com/Urigo/graphql-cli

npm install graphql-cli

Para crear el schema despues deploy prisma

npm run get-schema

## 5.11. Using Prisma Bindings

Usar prisma para fecht de datos en consola

## 5.12. Mutations with Prisma Bindings

Crea un post desde node y actualizar Post

## 5.13. Using AsyncAwait with Prisma Bindings

Crea Post Update post

## 5.14. Checking If Data Exists Using Prisma Bindings

Comprueba si el pots o comment exiten => ejecuta creacion comment o update pots

## 5.15. Customizing Type Relationships

Modificado datamodel para poder borrar un Usuario y se borren todos sus post y comentarios

## 5.16. Modeling a Review System with Prisma Set Up.es

Crear un nuevo proyecto en prisma de libros y reseñas

prisma-reiew-website

http://localhost:4466/reviews/default

## 5.17. Modeling a Review System with Prisma Solution

Crear libro, usuario y resenya

Borrar usuario y todas sus resenyas

Borrar libro y todas sus resenyas

# 6. Authentication with GraphQL

## 6.1. Section Intro Authentication with GraphQL

Introducción

## 6.2. Adding Prisma into GraphQL Queries

Conecta GraphQL localhost:4000 con BD Postgesql con prisma

query users y posts

## 6.3. Integrating Operation Arguments

Filtra la query user segun el numbre del usuario

Filtras la query post segun el titulo o el body

## 6.4. Refactoring Custom Type Resolvers

Modificaciones Query para con prisma para poder fecth de los datos de la BD
