namespace Demos.Views {
    import Layout = Weclarative.Views.Layout;
    import LayoutType = Weclarative.LayoutType;
    import Controls = Weclarative.Controls;
    import Control = Controls.Control;
    import HorizontalAlignment = Controls.HorizontalAlignment;
    import VerticalAlignment = Controls.VerticalAlignment;
    import AlignmentPanel = Weclarative.Controls.AlignmentPanel;

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
            this.leftPanel.style.padding = "5px";
            this.leftPanel.style.borderRight = "1px black solid";
            this.leftPanel.style.backgroundColor = DemoColors.leftSideBarBackgroundColor;

            const mainPanel = new Controls.SidePanel();
            mainPanel.left = this.leftPanel;
            mainPanel.center = this.contentPanel;
            mainPanel.style.height = "100%";

            const header = AlignmentPanel.Left(new Controls.TextBlock("Weclarative Demo"));
            header.style.backgroundColor = "black";
            header.style.padding = "5px";
            header.style.color = "white";

            const content = new Controls.FixedHeaderPanel();
            content.header = header;
            content.content = mainPanel;
            content.style.fontFamily = "Source Sans Pro, sans-serif";

            this.content = content;
        }

        loadSections(sections: Map<string, Control>) {
            this.leftPanel.removeAll();

            const leftSection = sections.get("sidebar");
            if (leftSection) {
                this.leftPanel.add(leftSection);
            }
        }

        onAddView(view: View) {
            if (this.contentPanel.content != null)
                this.removeView((this.contentPanel.content as Control).view);

            this.contentPanel.content = view.content;
        }
    }
}