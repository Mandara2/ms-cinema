import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Seat from "App/Models/Seat";

export default class SeatsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theSeat: Seat = await Seat.findOrFail(params.id)
            await theSeat.load("theater")
            return theSeat;
        } else {
            const data = request.all()
            if("theater_id" in data) {
                return await Seat.query().where("theater_id", request.input('theater_id'))
            }
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Seat.query().paginate(page, perPage) //devuelvame una fraccion de todos los teatros
            } else {
                return await Seat.query() //DEVUELVE TODOS LOS TEATROS SI NO SE ESPECIFICA EL ID
            }

        }

    }
    public async create({ request }: HttpContextContract) { 
        const body = request.body();
        const theSeat: Seat = await Seat.create(body);
        return theSeat;
    }

    public async update({ params, request }: HttpContextContract) {
        const theSeat: Seat = await Seat.findOrFail(params.id);
        const body = request.body();
        theSeat.location = body.location;
        theSeat.reclining = body.reclining;
        theSeat.theater_id = body.theater_id;
        return await theSeat.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theSeat: Seat = await Seat.findOrFail(params.id);
            response.status(204);
            return await theSeat.delete();
    }
}
