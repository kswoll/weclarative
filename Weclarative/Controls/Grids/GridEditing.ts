namespace Weclarative.Controls.Grids {
    export class GridEditing<T> implements IGridEditing<T> {
        constructor(private readonly initialValueFactory: () => T) {
        }

        createInitialValue(): T {
            return this.initialValueFactory();
        }
    }
}