namespace Weclarative.Compositions {
    import GridRow = Controls.Grids.GridRow;

    /**
     * Defines the HTML elements that make up the overall structure of the grid.  You can
     * interact with this class to change how the grid looks.
     */
    export class GridComposition extends Composition<HTMLTableElement> {
        readonly thead: HTMLElement = document.createElement("thead");
        readonly tbody: HTMLElement = document.createElement("tbody");
        readonly tfoot: HTMLElement = document.createElement("tfoot");
        readonly showMoreFoot: HTMLElement = document.createElement("tfoot");

        showMoreCell: HTMLTableCellElement | null;
        showMoreRow: HTMLTableRowElement | null;
        emptyRow: HTMLTableRowElement | null;
        emptyCell: HTMLTableCellElement | null;
        loadingRow: HTMLTableRowElement | null;
        loadingCell: HTMLTableCellElement | null;
    }
}