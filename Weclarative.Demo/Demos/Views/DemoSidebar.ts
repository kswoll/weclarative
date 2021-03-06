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

            const horizontalPanel = new Controls.Link("Horizontal Panel");
            horizontalPanel.localAction = App.instance.demoController.horizontalPanel;
            this.add(horizontalPanel);

            const verticalPanel = new Controls.Link("Vertical Panel");
            verticalPanel.localAction = App.instance.demoController.verticalPanel;
            this.add(verticalPanel);

            const slideDownHeaderPanel = new Controls.Link("Slide Down Header Panel");
            slideDownHeaderPanel.localAction = App.instance.demoController.slideDownHeaderPanel;
            this.add(slideDownHeaderPanel);

            const tablePanel = new Controls.Link("Table Panel");
            tablePanel.localAction = App.instance.demoController.tablePanel;
            this.add(tablePanel);

            const checkBox = new Controls.Link("CheckBox");
            checkBox.localAction = App.instance.demoController.checkBox;
            this.add(checkBox);

            const http = new Controls.Link("Calling APIs");
            http.localAction = App.instance.demoController.http;
            this.add(http);

            const autoCompleteTextBox = new Controls.Link("Auto Complete Text Box");
            autoCompleteTextBox.localAction = App.instance.demoController.autoCompleteTextBox;
            this.add(autoCompleteTextBox);

            const icon = new Controls.Link("Icon");
            icon.localAction = App.instance.demoController.icon;
            this.add(icon);

            const markDown = new Controls.Link("MarkDown");
            markDown.localAction = App.instance.demoController.markDown;
            this.add(markDown);

            const grid = new Controls.Link("Grid");
            grid.localAction = App.instance.demoController.grid;
            this.add(grid);

            const animations = new Controls.Link("Animations");
            animations.localAction = App.instance.demoController.animations;
            this.add(animations);
        }
    }
}