namespace Demos.Views {
    import View = Weclarative.Views.View;

    export class HomeView extends View {
        constructor() {
            super();

            this.title = "Weclarative Demo";
            this.layoutType = DemoLayout.type;

            this.sections.set("sidebar", new DemoSidebar());
        }
    }
}