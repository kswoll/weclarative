namespace Weclarative.Controls.Grids {
    export class FooterProvider<TValue> {
        aggregates = new ColumnAggregates<TValue>();

        footer(
            aggregate: IColumnAggregate<TValue>,
            contentProvider: IContentProvider,
            converter?: (value: TValue) => any)
        {
            converter = converter || ((x: TValue) => x);
            return new ColumnFooter(aggregate, contentProvider, converter);
        }
    }
}
