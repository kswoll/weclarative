import TextBlock = Controls.TextBlock;
import VerticalPanel = Controls.VerticalPanel;
import HorizontalPanel = Controls.HorizontalPanel;

class TestController extends Controller {
    get path() {
        return "";
    }

    registerRoutes(registrar: (route: string, action: Function) => void) {
        registrar("verticalPanel", this.verticalPanel);
        registrar("horizontalPanel", this.horizontalPanel);
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

    verticalPanel() {
        const view = new View();
        view.title = "Vertical Panel";
        const panel = new VerticalPanel();
        panel.add(new TextBlock("Item 1"));
        panel.add(new TextBlock("Item 2"));
        panel.add(new TextBlock("Item 3"));
        view.content = panel;
        return view;
    }

    horizontalPanel() {
        const view = new View();
        view.title = "Horizontal Panel";
        const panel = new HorizontalPanel();
        panel.add(new TextBlock("Item 1"));
        panel.add(new TextBlock("Item 2"));
        panel.add(new TextBlock("Item 3"));
        view.content = panel;
        return view;
    }
}