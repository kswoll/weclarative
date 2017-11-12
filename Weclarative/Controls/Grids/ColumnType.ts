namespace Weclarative.Controls.Grids {
    export interface IColumnType {
        readonly contentProvider: IContentProvider;
        readonly sorter?: (a: any, b: any) => number;
        readonly isRightAligned: boolean;
    }

    export class ColumnType<T> implements IColumnType {
        constructor(
            readonly contentProvider: IContentProvider,
            readonly sorter?: (a: T, b: T) => number,
            readonly isRightAligned: boolean = false)
        {
        }
    }

    export class ColumnTypes {
        static stringColumnType = new ColumnType<string>(ContentProviders.strings, (a, b) => a.localeCompare(b));
        static numberColumnType = new ColumnType<number>(ContentProviders.numbers, (a, b) => a - b, true);
        static controlColumnType = new ColumnType<void>(ContentProviders.void);
    }
}
