namespace Weclarative.Compositions {
    /**
     * Defines the HTML elements that make up the overall structure of the grid.  You can
     * interact with this class to change how the grid looks.
     */
    export class GridComposition extends Composition {
        readonly table: HTMLTableElement;
        readonly thead: HTMLElement;
        readonly tbody: HTMLElement;
        readonly tfoot: HTMLElement;
        readonly showMoreFoot: HTMLElement;
        showMoreCell: HTMLTableCellElement | null;
        showMoreRow: HTMLTableRowElement | null;
        emptyRow: HTMLTableRowElement | null;
        emptyCell: HTMLTableCellElement | null;
        loadingRow: HTMLTableRowElement | null;
        loadingCell: HTMLTableCellElement | null;

        constructor(node: HTMLElement) {
            super(node);
            this.thead = document.createElement("thead");
            this.tbody = document.createElement("tbody");
            this.tfoot = document.createElement("tfoot");
            this.showMoreFoot = document.createElement("tfoot");
        }
    }
}

