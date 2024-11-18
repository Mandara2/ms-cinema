import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import movie from 'App/Models/Movie';
import MovieValidator from 'App/Validators/MovieValidator';

export default class moviesController { //se encarga de hacer las operaciones de CRUD
    public async find({ request, params }: HttpContextContract) {
        console.log("listando")
        if (params.id) {
            let themovie: movie = await movie.findOrFail(params.id)
            return themovie;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await movie.query().paginate(page, perPage) //devuelvame una fraccion de todos los teatros
            } else {
                return await movie.query() //DEVUELVE TODOS LOS TEATROS SI NO SE ESPECIFICA EL ID
            }

        }

    }
    public async create({ request }: HttpContextContract) { 
        await request.validate(MovieValidator)
        const body = request.body();
        const themovie: movie = await movie.create(body);
        return themovie;
    }

    public async update({ params, request }: HttpContextContract) {
        const themovie: movie = await movie.findOrFail(params.id);
        const body = request.body();
        themovie.name = body.name;
        themovie.duration = body.duration;
        themovie.date = body.date;
        
        return await themovie.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const themovie: movie = await movie.findOrFail(params.id);
            response.status(204);
            return await themovie.delete();
    }
}


/*
export default class hace que la clase pueda ser importada en otros archivos.

({ request, params }: HttpContextContract) toma un único objeto como parámetro, desestructurándolo para obtener dos propiedades:

- request: Representa la petición HTTP, contiene la información de los datos enviados, los parámetros de consulta, el cuerpo del mensaje, etc.

- params: Son los parámetros que vienen en la ruta de la petición, como un id.

HttpContextContract define el tipo de parámetro utilizando TypeScript. Es una interfaz que define la estructura de los objetos que contienen el contexto de una petición HTTP en Adonis, asegurando que request y params tengan el formato correcto.
*/
