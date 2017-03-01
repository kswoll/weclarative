namespace Demos.Views {
    import Controls = Weclarative.Controls;
    import TextBlock = Controls.TextBlock;

    export class DemoSidebar extends Controls.VerticalPanel {
        constructor() {
            super();

            const item1 = new Controls.Link("Side Panel");
            item1.localAction = App.instance.demoController.sidePanel; // Todo: allow Link to take a function that is later translated to a url
            this.add(item1);
        }
    }
}