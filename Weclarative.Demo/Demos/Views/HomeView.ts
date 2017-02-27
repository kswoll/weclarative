namespace Demos.Views {
    import View = Weclarative.Views.View;
    import Controls = Weclarative.Controls;

    export class HomeView extends View {
        constructor() {
            super();

            this.content = new CenteredPanel(new Controls.TextBlock("Hello World"));

            this.title = "Weclarative Demo";
            this.layoutType = DemoLayout.type;

            this.sections.set("sidebar", new DemoSidebar());
        }
    }
}