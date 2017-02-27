namespace Demos.Views {
    import Controls = Weclarative.Controls;
    import TextBlock = Controls.TextBlock;

    export class DemoSidebar extends Controls.VerticalPanel {
        constructor() {
            super();

            const item1 = new Controls.Link("Item 1");
            item1.localHref = "/sidePanel";
            this.add(item1);
        }
    }
}