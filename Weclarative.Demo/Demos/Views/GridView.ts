namespace Demos.Views {
    import Grid = Weclarative.Controls.Grids.Grid;
    import DefaultGridColumn = Weclarative.Controls.Grids.DefaultGridColumn;

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

            grid.add(new TestRow("Kirk", "Woll"));
            grid.add(new TestRow("Andrew", "Simpkins"));
            grid.add(new TestRow("Carl", "Woll"));
            grid.add(new TestRow("Lara", "Robinette"));

            mainPanel.add(grid);

            this.content = mainPanel;
        }
    }

    class TestRow {
        constructor(readonly firstName: string, readonly lastName: string) {
        }
    }
}
