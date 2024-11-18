import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Projector from 'App/Models/Projector';

export default class ProjectorsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theProjector: Projector = await Projector.findOrFail(params.id)
            return theProjector;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Projector.query().paginate(page, perPage) //devuelvame una fraccion de todos los teatros
            } else {
                return await Projector.query() //DEVUELVE TODOS LOS Projectors SI NO SE ESPECIFICA EL ID
            }

        }

    }
    public async create({ request }: HttpContextContract) { 
        const body = request.body();
        const theProjector: Projector = await Projector.create(body);
        await theProjector.load("theater") //carga la llave foranea en la base de datos
        return theProjector;
    }

    public async update({ params, request }: HttpContextContract) {
        const theProjector: Projector = await Projector.findOrFail(params.id);
        const body = request.body();
        theProjector.brand = body.brand;
        theProjector.high = body.high;
        theProjector.width = body.width;
        theProjector.theater_id = body.theater_id;
        return await theProjector.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theProjector: Projector = await Projector.findOrFail(params.id);
            response.status(204);
            return await theProjector.delete();
    }
}
