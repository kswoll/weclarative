namespace Demos.Views {
    import Layout = Weclarative.Views.Layout;
    import LayoutType = Weclarative.LayoutType;
    import Controls = Weclarative.Controls;
    import Control = Controls.Control;
    import HorizontalAlignment = Controls.HorizontalAlignment;
    import VerticalAlignment = Controls.VerticalAlignment;

    export class DemoLayout extends Layout {
        static type = new LayoutType(DemoLayout.name, () => new DemoLayout());

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

            const content = new Controls.FixedHeaderPanel();
            content.header = new Controls.TextBlock("Weclarative Demo");
            content.content = mainPanel;

            this.content = content;
        }

        loadSections(sections: Map<string, Control>) {
            this.leftPanel.removeAll();

            const leftSection = sections.get("sidebar");
            if (leftSection) {
                this.leftPanel.add(leftSection);
            }
        }
    }
}