namespace Weclarative.Controls.Grids {
    export class ContentGridCell<T> extends GridCell<T> {
        constructor(column: IGridColumn<T>, readonly row: T, tagName?: string) {
            super(column, tagName);
        }
    }
}