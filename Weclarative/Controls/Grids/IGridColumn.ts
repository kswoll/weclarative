namespace Weclarative.Controls.Grids {
    export interface IGridColumn<T> {
        createHeaderCell(): GridCell;
        createFooterCell(): GridCell;
        createCell(item: any): ContentGridCell<T>;
        readonly editor: IGridEditor<T>;
    }
}