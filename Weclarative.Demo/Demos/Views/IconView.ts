namespace Demos.Views {
    import Enums = Weclarative.Utils.Enums;
    import AlignmentPanel = Weclarative.Controls.AlignmentPanel;
    import MarkDown = Weclarative.Controls.MarkDown;
    import Icon = Weclarative.Controls.Icon;
    import IconType = Weclarative.Controls.IconType;
    import NameValuePanel = Weclarative.Controls.NameValuePanel;
    import ListBox = Weclarative.Controls.ListBox;
    import FixedPanel = Weclarative.Controls.FixedPanel;
    import TitledPanel = Weclarative.Controls.TitledPanel;

    export class IconView extends BaseView {
        constructor() {
            super();

            this.title = "Weclarative Demo - Icon";

            const mainPanel = new VerticalPanel();
            mainPanel.style.padding = "10px";
            mainPanel.spacing = 10;
            mainPanel.style.maxWidth = "800px";
            const summary = AlignmentPanel.Left(new MarkDown(`
The \`Icon\` control is a wrapper around font awesome icons.  The icons are encapsulated in an enum,
making it easy to choose the one you want.
            `));
            mainPanel.add(summary);

            const icon = new Icon(IconType.Cloud);
            mainPanel.add(icon);

            const properties = new NameValuePanel();
            properties.spacing = 10;

            const iconType = new ListBox<IconType>(x => IconType[x]);
            iconType.bindItems(Enums.getValues<IconType>(IconType));
            iconType.onChanged.add(() =>
            {
                icon.source = iconType.selectedItem || IconType.None;
            });
            properties.addPair("Icon Type", new FixedPanel(iconType, "100%", "200px"));

            mainPanel.add(new TitledPanel("Properties", properties));

            this.content = mainPanel;
        }
    }
}