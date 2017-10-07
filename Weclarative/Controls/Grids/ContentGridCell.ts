namespace Weclarative.Controls.Grids {
    export class ContentGridCell<T> extends GridCell<T> {
        constructor(column: Controls.Grids.GridColumn<T>, readonly row: T, tagName?: string) {
            super(column, tagName);
        }
    }
}