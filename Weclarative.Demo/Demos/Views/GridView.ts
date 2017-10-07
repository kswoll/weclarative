namespace Demos.Views {
    import Grid = Weclarative.Controls.Grids.Grid;
    import DefaultGridColumn = Weclarative.Controls.Grids.DefaultGridColumn;
    import TitledPanel = Weclarative.Controls.TitledPanel;
    import NameValuePanel = Weclarative.Controls.NameValuePanel;
    import CheckBox = Weclarative.Controls.CheckBox;
    import TextBlock = Weclarative.Controls.TextBlock;

    export class GridView extends BaseView {
        constructor() {
            super();

            this.title = "Weclarative Demo - GridView";
            const mainPanel = new VerticalPanel();
            mainPanel.style.padding = "10px";
            mainPanel.spacing = 10;
            mainPanel.style.maxWidth = "800px";

            const grid = new Grid();
            grid.style.width = "600px";
            grid.addColumn(new DefaultGridColumn<TestRow>("First Name", x => x.firstName, "25%", "Test Footer"));
            grid.addColumn(new DefaultGridColumn<TestRow>("Last Name", x => x.lastName));
            grid.isFooterVisible = true;
            grid.showMoreButton.onClick.add(() => alert("You clicked on the button!"));
            grid.loading = new TextBlock("Loading...");

            grid.add(new TestRow("Kirk", "Woll"));
            grid.add(new TestRow("Andrew", "Simpkins"));
            grid.add(new TestRow("Carl", "Woll"));
            grid.add(new TestRow("Lara", "Robinette"));

            const settingsPanel = new NameValuePanel();

            const enableShowMoreButton = new CheckBox();
            enableShowMoreButton.onChanged.add(() => grid.isShowMoreButtonVisible = enableShowMoreButton.isChecked);
            settingsPanel.addPair("Enable Show More Button", enableShowMoreButton);

            const enableLoading = new CheckBox();
            enableLoading.onChanged.add(() => grid.isLoading = enableLoading.isChecked);
            settingsPanel.addPair("Enable Loading Display", enableLoading);

            const controlPanel = new TitledPanel("Settings");
            controlPanel.content = settingsPanel;

            mainPanel.add(controlPanel);
            mainPanel.add(grid);

            this.content = mainPanel;
        }
    }

    class TestRow {
        constructor(readonly firstName: string, readonly lastName: string) {
        }
    }
}
