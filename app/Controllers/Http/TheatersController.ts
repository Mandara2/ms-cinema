import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Theater from 'App/Models/Theater';

export default class TheatersController { //se encarga de hacer las operaciones de CRUD
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theTheater: Theater = await Theater.findOrFail(params.id)
            await theTheater.load("projector")
            await theTheater.load("seats")
            return theTheater;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Theater.query().paginate(page, perPage) //devuelvame una fraccion de todos los teatros
            } else {
                return await Theater.query() //DEVUELVE TODOS LOS TEATROS SI NO SE ESPECIFICA EL ID
            }

        }

    }
    public async create({ request }: HttpContextContract) { 
        const body = request.body();
        const theTheater: Theater = await Theater.create(body);
        return theTheater;
    }

    public async update({ params, request }: HttpContextContract) {
        const theTheater: Theater = await Theater.findOrFail(params.id);
        const body = request.body();
        theTheater.location = body.location;
        theTheater.capacity = body.capacity;
        return await theTheater.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theTheater: Theater = await Theater.findOrFail(params.id);
            response.status(204);
            return await theTheater.delete();
    }
}


/*
export default class hace que la clase pueda ser importada en otros archivos.

({ request, params }: HttpContextContract) toma un único objeto como parámetro, desestructurándolo para obtener dos propiedades:

- request: Representa la petición HTTP, contiene la información de los datos enviados, los parámetros de consulta, el cuerpo del mensaje, etc.

- params: Son los parámetros que vienen en la ruta de la petición, como un id.

HttpContextContract define el tipo de parámetro utilizando TypeScript. Es una interfaz que define la estructura de los objetos que contienen el contexto de una petición HTTP en Adonis, asegurando que request y params tengan el formato correcto.
*/