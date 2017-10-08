namespace Weclarative.Controls.Grids {
    export class ColumnFooter<TValue> {
        constructor(
            readonly aggregate: IColumnAggregate<TValue>,
            readonly contentProvider: IContentProvider,
            readonly converter: (value: TValue) => any)
        {
        }
    }
}
