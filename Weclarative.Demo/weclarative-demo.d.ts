declare namespace Tests {
    class TestApplication extends MvcApplication {
        constructor();
        registerControllers(registry: ControllerRegistry): void;
    }
}
import TextBlock = Controls.TextBlock;
import VerticalPanel = Controls.VerticalPanel;
import HorizontalPanel = Controls.HorizontalPanel;
declare class TestController extends Controller {
    readonly path: string;
    registerRoutes(registrar: (route: string, action: Function) => void): void;
    getById(id: number): View;
    home(): View;
    verticalPanel(): View;
    horizontalPanel(): View;
}
