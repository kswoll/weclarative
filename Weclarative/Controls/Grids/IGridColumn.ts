namespace Weclarative.Controls.Grids {
    export interface IGridColumn<T> {
        createHeaderCell(): GridCell<T>;
        createFooterCell(): GridCell<T>;
        createCell(item: T): ContentGridCell<T>;
        readonly editor: IGridEditor<T>;
    }
}