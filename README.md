# Proyecto red social 
Este proyecto es una red social básica en el backend que permite crear y gestionar perfiles de usuarios y posts. Está construido con Node.js, Express, MongoDB, y Firebase para la gestión de datos y autenticación.

## Tecnologías usadas
- Node.js
- Express
- MongoDB
- CORS
- Firebase

### Endpoints principales

Profile 
- POST /api/profile: Crea un nuevo usuario o actualiza uno existente
- GET /api/profile/users: Obtiene todos los usuarios.
- GET /api/profile/users/:id : Obtiene un usuario por su ID.
- DELETE /api/profile/delete/:id : Elimina un usuario.

Posts 
- POST /api/posts/new: Crea un nuevo post
- GET /api/posts/mypost: 
- GET /api/posts/allposts : Obtiene todos los posts
- PUT /api/posts/edit/postId : Edita un post según su ID
- DELETE /api/posts/delete/postId : Elimina un post.