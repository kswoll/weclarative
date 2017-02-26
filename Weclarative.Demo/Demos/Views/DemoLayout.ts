namespace Demos.Views {
    import Layout = Weclarative.Views.Layout;
    import Controls = Weclarative.Controls;
    import Control = Controls.Control;
    import HorizontalAlignment = Controls.HorizontalAlignment;
    import VerticalAlignment = Controls.VerticalAlignment;

    export class DemoLayout extends Layout {
        private headerPanel = new Controls.VerticalPanel(HorizontalAlignment.Fill);
        private contentPanel = new Controls.SlideDownHeaderPanel();
        private leftPanel = new VerticalPanel(HorizontalAlignment.Left);

        constructor() {
            super();
            
            this.headerPanel.verticalAlignment = VerticalAlignment.Top;
            this.leftPanel.verticalAlignment = VerticalAlignment.Top;
            this.leftPanel.style.width = "250px";
            this.leftPanel.style.height = "100%";
            this.leftPanel.style.backgroundColor = DemoColors.leftSideBarBackgroundColor;

            const mainPanel = new Controls.SidePanel();
            mainPanel.left = this.leftPanel;
            mainPanel.center = this.contentPanel;

            this.content = new Controls.FixedHeaderPanel();
        }

        loadSections(sections: Map<string, Control>) {

        }
    }
}