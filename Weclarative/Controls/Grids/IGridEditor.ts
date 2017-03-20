namespace Weclarative.Controls.Grids {
    export interface IGridEditor<T> {
        createEditor(item: T, moveNext: () => void): Control;
    }
}