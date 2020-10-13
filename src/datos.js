
// Demo user data
let users = [{
  id: '1',
  name: 'Pedro',
  email: 'pedro@gmail.com',
  age: 27
}, {
  id: '2',
  name: 'Bulma',
  email: 'bulma@gmail.com'
},
{
  id: '3',
  name: 'Pablo',
  email: 'Pablo@gmail.com'
}
]
// demo post data
let posts = [{
  id: '1',
  title: 'El titulo del post',
  body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, nostrum. Sapiente tempore eius debitis vero, facilis nisi at suscipit magnam veniam quasi quibusdam, exercitationem dicta, quas natus commodi mollitia quos!',
  published: true,
  author: '1'
}, {
  id: '2',
  title: 'Segundo post',
  body: 'Tomatede dedadwead des dcxweac dxwaecx dweacdw cwaec wacascwawea',
  published: false,
  author: '1'
}, {
  id: '3',
  title: 'Tercero',
  body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, nostrum. Sapiente tempore eius debitis vero, facilis nisi at suscipit magnam veniam quasi quibusdam, exercitationem dicta, quas natus commodi mollitia quos!',
  published: true,
  author: '2'
}
]

let comments = [{
  id: '1',
  body: 'Esto es el texto del comentario numero uno',
  author: '1',
  post: '1'

}, {
  id: '2',
  body: 'Esto es el texto del comentario numero DOS',
  author: '1',
  post: '2'


}, {
  id: '3',
  body: 'Esto es el texto del comentario numero TRES',
  author: '2',
  post: '3'


}, {
  id: '4',
  body: 'Esto es el texto del comentario numero CUATRO',
  author: '2',
  post: '1'

}
]

export { users, posts, comments }