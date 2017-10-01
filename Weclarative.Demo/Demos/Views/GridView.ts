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
            grid.addColumn(new DefaultGridColumn<TestRow>("First Name", x => x.firstName));
            grid.addColumn(new DefaultGridColumn<TestRow>("Last Name", x => x.lastName));
            grid.add(new TestRow("Kirk", "Woll"));
            mainPanel.add(grid);

            this.content = mainPanel;
        }
    }

    class TestRow {
        constructor(readonly firstName: string, readonly lastName: string) {
        }
    }
}
