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
            registrar("horizontalPanel", this.horizontalPanel);
            registrar("verticalPanel", this.verticalPanel);
            registrar("checkBox", this.checkBox);
            registrar("http", this.http);
            registrar("autoCompleteTextBox", this.autoCompleteTextBox);
            registrar("icon", this.icon);
            registrar("markDown", this.markDown);
//            registrar("grid", this.grid);
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

        horizontalPanel() {
            return new Views.HorizontalPanelView();
        }

        verticalPanel() {
            return new Views.VerticalPanelView();
        }

        checkBox() {
            return new Views.CheckBoxView();
        }

        http() {
            return new Views.HttpView();
        }

        autoCompleteTextBox() {
            return new Views.AutoCompleteTextBoxView();
        }

        icon() {
            return new Views.IconView();
        }

        markDown() {
            return new Views.MarkDownView();
        }

        grid() {
            return new Views.GridView();
        }
    }
}