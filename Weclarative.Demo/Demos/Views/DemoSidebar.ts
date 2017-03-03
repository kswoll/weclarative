﻿namespace Demos.Views {
    import Controls = Weclarative.Controls;
    import TextBlock = Controls.TextBlock;

    export class DemoSidebar extends Controls.VerticalPanel {
        constructor() {
            super();

            const item1 = new Controls.Link("Side Panel");
//            item1.localHref = View.generateUrl(App.instance.testController.getById, call => call(5)); // Todo: allow Link to take a function that is later translated to a url
            item1.localAction = App.instance.demoController.sidePanel; // Todo: allow Link to take a function that is later translated to a url
            this.add(item1);

            const alignmentPanel = new Controls.Link("Alignment Panel");
            alignmentPanel.localAction = App.instance.demoController.alignmentPanel;
            this.add(alignmentPanel);
        }
    }
}