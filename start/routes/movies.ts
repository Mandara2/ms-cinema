import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/movies", "MoviesController.find");
    Route.get("/movies/:id", "MoviesController.find"); //metodo, url y el metodo que se va a accionar
    Route.post("/movies", "MoviesController.create");
    Route.put("/movies/:id", "MoviesController.update");
    Route.delete("/movies/:id", "MoviesController.delete");
}).middleware(['security'])