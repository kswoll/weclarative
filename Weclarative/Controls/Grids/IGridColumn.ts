namespace Weclarative.Controls.Grids {
    export interface IGridColumn<T> {
        readonly grid: Grid<T>;
        readonly editor: IGridEditor<T>;
        createCell(item: T): ContentGridCell<T>;
        rowAdded(item: T): void;
        rowRemoved(item: T): void;
        update(): void;
    }
}
