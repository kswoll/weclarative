namespace Demos.Views {
    import SidePanel = Weclarative.Controls.SidePanel;
    import TextBlock = Weclarative.Controls.TextBlock;
    import Html = Weclarative.Controls.Html;
    import AlignmentPanel = Weclarative.Controls.AlignmentPanel;
    import FillPanel = Weclarative.Controls.FillPanel;
    import TitledPanel = Weclarative.Controls.TitledPanel;
    import TextBox = Weclarative.Controls.TextBox;
    import TextBoxType = Weclarative.Controls.TextBoxType;
    import NameValuePanel = Weclarative.Controls.NameValuePanel;
    import InlineText = Weclarative.Controls.InlineText;
    import Panels = Weclarative.Controls.Panels;
    import CheckBox = Weclarative.Controls.CheckBox;
    import MarkDown = Weclarative.Controls.MarkDown;

    export class SidePanelView extends BaseView {
        constructor() {
            super();

            this.title = "Weclarative Demo - SidePanel";

            const mainPanel = new VerticalPanel();
            mainPanel.style.padding = "10px";
            mainPanel.spacing = 10;
            mainPanel.style.maxWidth = "800px";
            const summary = AlignmentPanel.Left(new MarkDown(`
The \`SidePanel\` allows you to arrange children by attaching them to the top, bottom, left, right or center. All are
optional.

* The height of the top and bottom are determined by the preferred height of their contents.
* The width of the left and right are determined by the preferred width of their contents.
* The center panel will take up the remaining space.

For the purposes of calculating the preferred size of the \`SidePanel\` itself, the preferred size of the centered
panel will be factored.
            `));
            mainPanel.add(summary);

            const top = new CenteredPanel(new TextBlock("Top"));
            top.style.backgroundColor = "#FFDDDD";
            top.style.padding = "10px";

            const left = new CenteredPanel(new TextBlock("Left"));
            left.style.backgroundColor = "#DDFFFF";
            left.style.padding = "10px";

            const right = new CenteredPanel(new TextBlock("Right"));
            right.style.backgroundColor = "#DDDDFF";
            right.style.padding = "10px";

            const center = new CenteredPanel(new TextBlock("Center"));
            center.style.backgroundColor = "#FFDDFF";
            center.style.padding = "10px";

            const bottom = new CenteredPanel(new TextBlock("Bottom"));
            bottom.style.backgroundColor = "#FFFFDD";
            bottom.style.padding = "10px";

            const demoSidePanel = new SidePanel();
            demoSidePanel.top = top;
            demoSidePanel.left = left;
            demoSidePanel.right = right;
            demoSidePanel.center = center;
            demoSidePanel.bottom = bottom;
            demoSidePanel.style.border = "1px black solid";
            demoSidePanel.style.backgroundColor = "black";
            demoSidePanel.spacing = 1;
            mainPanel.add(demoSidePanel);

            const spacing = new TextBox();
            spacing.text = "1";
            spacing.type = TextBoxType.Number;
            spacing.onChanged.add(() => demoSidePanel.spacing = parseInt(spacing.text));

            const showTop = new CheckBox();
            showTop.isChecked = true;
            showTop.onChanged.add(() => {
                demoSidePanel.top = showTop.isChecked ? top : null;
            });
            const showLeft = new CheckBox();
            showLeft.isChecked = true;
            showLeft.onChanged.add(() => {
                demoSidePanel.left = showLeft.isChecked ? left : null;
            });
            const showCenter = new CheckBox();
            showCenter.isChecked = true;
            showCenter.onChanged.add(() => {
                demoSidePanel.center = showCenter.isChecked ? center : null;
            });
            const showRight = new CheckBox();
            showRight.isChecked = true;
            showRight.onChanged.add(() => {
                demoSidePanel.right = showRight.isChecked ? right : null;
            });
            const showBottom = new CheckBox();
            showBottom.isChecked = true;
            showBottom.onChanged.add(() => {
                demoSidePanel.bottom = showBottom.isChecked ? bottom : null;
            });

            const footer = new TitledPanel("Properties");
            const properties = new NameValuePanel();
            properties.spacing = 10;
            properties.addPair("Spacing", AlignmentPanel.Left(spacing));
            properties.addPair("Top", showTop);
            properties.addPair("Left", showLeft);
            properties.addPair("Center", showCenter);
            properties.addPair("Right", showRight);
            properties.addPair("Bottom", showBottom);
            footer.content = properties;
            mainPanel.add(footer);

            this.content = mainPanel;
        }
    }
}