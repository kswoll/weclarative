namespace Weclarative.Controls.Grids {
    export class Grid<T> extends Control {
        private readonly table: HTMLTableElement;
        private readonly thead: HTMLElement;
        private readonly tfoot: HTMLElement;
        private readonly showMoreFoot: HTMLElement;

        columns = new Array<IGridColumn<T>>();
        items = new Array<T>();
        rows = new Map<T, GridRow<T>>();
        headerCells = new Map<IGridColumn<T>, GridCell>();
    }
}