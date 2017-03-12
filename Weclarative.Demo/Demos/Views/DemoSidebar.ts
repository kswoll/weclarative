namespace Demos.Views {
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

            const checkBox = new Controls.Link("CheckBox");
            checkBox.localAction = App.instance.demoController.checkBox;
            this.add(checkBox);

            const http = new Controls.Link("Calling APIs");
            http.localAction = App.instance.demoController.http;
            this.add(http);

            const autoCompleteTextBox = new Controls.Link("Auto Complete Text Box");
            autoCompleteTextBox.localAction = App.instance.demoController.autoCompleteTextBox;
            this.add(autoCompleteTextBox);
        }
    }
}