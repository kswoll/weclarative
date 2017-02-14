class TestController extends Controller {
    setUpRoutes(routes: RouteEngine) {
        routes.add("/test/{id:int}",
            (id: number) => {
                return new ViewResult(new View());
            });
    }
}