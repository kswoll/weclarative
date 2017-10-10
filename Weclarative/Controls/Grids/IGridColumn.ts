namespace Weclarative.Controls.Grids {
    export interface IGridColumn<T> {
        readonly grid: Grid<T>;
        readonly type: IColumnType;
        getValue(item: T): any;
        readonly isEditable: boolean;
        setValue(item: T, value: any): void;
        createCell(row: GridRow<T>): ContentGridCell<T>;
        rowAdded(item: T): void;
        rowRemoved(item: T): void;
        update(): void;
    }
}
