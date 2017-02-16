class TestController extends Controller {
    registerRoutes(routes: RouteEngine) {
        routes.add("/test/{id:int}",
            (id: number) => {
                return new ViewResult(new View());
            });
    }
}