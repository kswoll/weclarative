namespace Demos {
    export class DemoController extends Controller {
        get path() {
            return "";
        }

        registerRoutes(registrar: (route: string, action: Function) => void) {
            registrar("", this.home);
        }

        home() {
            return new Views.HomeView();
        }
    }
}