import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/seats", "SeatsController.find");
    Route.get("/seats/:id", "SeatsController.find"); //metodo, url y el metodo que se va a accionar
    Route.post("/seats", "SeatsController.create");
    Route.put("/seats/:id", "SeatsController.update");
    Route.delete("/seats/:id", "SeatsController.delete");
}).middleware(['security'])