namespace Weclarative.Controls.Grids {
    export class FooterProvider<TValue> {
        aggregates = new ColumnAggregates<TValue>();

        simple(aggregate: IColumnAggregate<TValue>, contentProvider: IContentProvider) {
            return new ColumnFooter(aggregate, contentProvider, x => x);
        }

        complex<TResult>(
            aggregate: IColumnAggregate<TValue>,
            contentProvider: IContentProvider,
            converter: (value: TValue) => TResult)
        {
            return new ColumnFooter(aggregate, contentProvider, converter);
        }
    }
}
