namespace Weclarative.Controls.Grids {
    export class ContentGridCell<T> extends GridCell {
        constructor(column: IGridColumn, readonly row: T, tagName?: string) {
            super(column, tagName);
        }
    }
}