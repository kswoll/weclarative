declare namespace Tests {
    class TestApplication extends MvcApplication {
        constructor();
        registerControllers(registry: ControllerRegistry): void;
    }
}
import TextBlock = Controls.TextBlock;
import VerticalPanel = Controls.VerticalPanel;
import HorizontalPanel = Controls.HorizontalPanel;
import CenteredPanel = Controls.CenteredPanel;
import TablePanelWidth = Controls.TablePanelWidth;
declare class TestController extends Controller {
    readonly path: string;
    registerRoutes(registrar: (route: string, action: Function) => void): void;
    getById(id: number): View;
    home(): View;
    verticalPanel(): View;
    horizontalPanel(): View;
    centeredPanel(): View;
    alignmentPanel(): View;
    fixedPanel(): View;
    sidePanel(): View;
    tablePanel(): View;
    checkBox(): View;
    listView(): View;
    titledPanel(): View;
    textBox(): View;
}
