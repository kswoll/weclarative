class TestController extends Controller {
    registerRoutes(routes: RouteEngine) {
        routes.add("/test/{id:number}", this.getById);
    }

    getById(id: number) {
         return new ViewResult(new View());
    }
}