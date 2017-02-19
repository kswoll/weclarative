import TextBlock = Controls.TextBlock;

class TestController extends Controller {
    get path() {
        return "";
    }

    registerRoutes(registrar: (route: string, action: Function) => void) {
        registrar("{id:number}", this.getById);
        registrar("", this.home);
    }

    getById(id: number) {
         return new View();
    }

    home() {
        const view = new View();
        view.title = "Hello!";
        view.content = new TextBlock("Why hello3!");
        return view;
    }
}