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
    import IconSize = Weclarative.Controls.IconSize;
    import CheckBox = Weclarative.Controls.CheckBox;

    export class IconView extends BaseView {
        private iconType: ListBox<IconType>;
        private iconSize: ListBox<IconSize>;

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

            const icon = new Icon(IconType.Adjust);
            mainPanel.add(new TitledPanel("Icon", icon));

            const properties = new NameValuePanel();
            properties.spacing = 10;

            this.iconType = new ListBox<IconType>(x => IconType[x]);
            this.iconType.bindItems(Enums.getValues<IconType>(IconType));
            this.iconType.selectedItem = IconType.Adjust;
            this.iconType.focus();
            this.iconType.onChanged.add(() =>
            {
                icon.source = this.iconType.selectedItem || IconType.None;
            });

            this.iconSize = new ListBox<IconSize>(x => IconSize[x]);
            this.iconSize.bindItems(Enums.getValues<IconSize>(IconSize));
            this.iconSize.selectedItem = IconSize.Normal;
            this.iconSize.onChanged.add(() => {
                icon.size = this.iconSize.selectedItem || IconSize.Normal;
            });

            const isSpinning = new CheckBox();
            isSpinning.onChanged.add(() => {
                icon.isSpinning = isSpinning.isChecked;
            });

            properties.addPair("Icon Type", new FixedPanel(this.iconType, "100%", "200px"));
            properties.addPair("Icon Size", new FixedPanel(this.iconSize, "100%", "100px"));
            properties.addPair("Is Spinning", isSpinning);

            mainPanel.add(new TitledPanel("Properties", properties));

            this.content = mainPanel;
        }
    }
}