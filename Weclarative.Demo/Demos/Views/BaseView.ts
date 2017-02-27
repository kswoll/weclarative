namespace Demos.Views {
    import Views = Weclarative.Views;
    import View = Views.View;

    export class BaseView extends View {
        constructor() {
            super();

            this.layoutType = DemoLayout.type;
            this.sections.set("sidebar", new DemoSidebar());
        }
    }
}