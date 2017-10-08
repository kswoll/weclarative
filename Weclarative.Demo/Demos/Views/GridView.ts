namespace Demos.Views {
    import Grid = Weclarative.Controls.Grids.Grid;
    import TitledPanel = Weclarative.Controls.TitledPanel;
    import NameValuePanel = Weclarative.Controls.NameValuePanel;
    import CheckBox = Weclarative.Controls.CheckBox;
    import TextBlock = Weclarative.Controls.TextBlock;
    import Icon = Weclarative.Controls.Icon;
    import IconType = Weclarative.Controls.IconType;
    import IconSize = Weclarative.Controls.IconSize;
    import Button = Weclarative.Controls.Button;
    import ContentProviders = Weclarative.Controls.Grids.ContentProviders;

    export class GridView extends BaseView {
        private grid = new Grid<TestRow>();

        constructor() {
            super();

            this.title = "Weclarative Demo - GridView";
            const mainPanel = new VerticalPanel();
            mainPanel.style.padding = "10px";
            mainPanel.spacing = 10;
            mainPanel.style.maxWidth = "600px";

            this.grid.style.width = "100%";

            this.grid.addStringColumn("First Name", x => x.firstName, "25%",
                x => x.simple(x.aggregates.count, ContentProviders.numbers));
            this.grid.addStringColumn("Last Name", x => x.lastName);
            this.grid.isFooterVisible = true;
            this.grid.showMoreButton.onClick.add(() => alert("You clicked on the button!"));

            const loading = new Icon(IconType.Spinner);
            loading.isSpinning = true;
            loading.size = IconSize.TwoX;
            loading.style.padding = "20px";
            this.grid.loading = new CenteredPanel(loading);

            this.grid.empty = new TextBlock("No items! Perhaps you should add some, hmm?");

            const settingsPanel = new NameValuePanel();

            const enableShowMoreButton = new CheckBox();
            enableShowMoreButton.onChanged.add(() => this.grid.isShowMoreButtonVisible = enableShowMoreButton.isChecked);
            settingsPanel.addPair("Enable Show More Button", enableShowMoreButton);

            const enableLoading = new CheckBox();
            enableLoading.onChanged.add(() => this.grid.isLoading = enableLoading.isChecked);
            settingsPanel.addPair("Enable Loading Display", enableLoading);

            const buttons = new HorizontalPanel();

            const clearButton = new Button("Clear");
            clearButton.onClick.add(() => this.clear());

            const populateButton = new Button("Populate");
            populateButton.onClick.add(() => this.populate());

            buttons.add(clearButton);
            buttons.add(populateButton);

            const controlPanel = new TitledPanel("Settings");
            controlPanel.content = settingsPanel;

            mainPanel.add(controlPanel);
            mainPanel.add(this.grid);
            mainPanel.add(buttons);

            this.populate();

            this.content = mainPanel;
        }

        clear() {
            this.grid.clear();
        }

        populate() {
            this.grid.add(new TestRow("Kirk", "Woll"));
            this.grid.add(new TestRow("Andrew", "Simpkins"));
            this.grid.add(new TestRow("Carl", "Woll"));
            this.grid.add(new TestRow("Lara", "Robinette"));
        }
    }

    class TestRow {
        constructor(readonly firstName: string, readonly lastName: string) {
        }
    }
}
