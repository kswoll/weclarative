namespace Demos {
    import Controller = Weclarative.Controller;

    export class DemoController extends Controller {
        get path() {
            return "";
        }

        registerRoutes(registrar: (route: string, action: Function) => void) {
            registrar("", this.home);
            registrar("sidePanel", this.sidePanel);
            registrar("alignmentPanel", this.alignmentPanel);
        }

        home() {
            return new Views.HomeView();
        }

        sidePanel() {
            return new Views.SidePanelView();
        }

        alignmentPanel() {
            return new Views.AlignmentPanelView();
        }
    }
}