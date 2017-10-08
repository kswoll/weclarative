namespace Weclarative.Controls.Grids {
    export class ColumnType<T> {
        constructor(
            readonly contentProvider: IContentProvider,
            readonly sorter?: (a: T, b: T) => number)
        {
        }
    }

    export class ColumnTypes {
        static stringColumnType = new ColumnType<string>(ContentProviders.strings, (a, b) => a.localeCompare(b));
        static numberColumnType = new ColumnType<number>(ContentProviders.numbers, (a, b) => a - b);
    }
}
