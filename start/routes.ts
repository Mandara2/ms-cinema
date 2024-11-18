/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

import "./routes/theaters"
import "./routes/projectors"
import "./routes/seats"
import "./routes/movies"
import "./routes/screenings"


//1. Crear las clases (node ace make:migration Name | node ace make:model Name | node ace make:controller Theater)

//2. Crear el archivo en routes 
//(aqui se definen el grupo instrucciones del CRUD, especificando la ruta (url) y 
//luego la clase en donde se va a ejecutar el método)

//3. importar la clase que implementamos