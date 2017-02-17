class TestController extends Controller {
    get path() {
        return "test";
    }

    registerRoutes(registrar: (route: string, action: Function) => void) {
        registrar("{id:number}", this.getById);
    }

    getById(id: number) {
         return new ViewResult(new View());
    }
}