namespace Demos.Views {
    import Controls = Weclarative.Controls;

    export class HomeView extends BaseView {
        constructor() {
            super();

            this.content = new CenteredPanel(new Controls.TextBlock("Hello World YAY!"));
            this.title = "Weclarative Demo - Home";
        }
    }
}