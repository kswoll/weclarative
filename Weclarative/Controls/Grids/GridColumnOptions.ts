namespace Weclarative.Controls.Grids {
    export class GridColumnOptions<TItem, TValue> {
        title: string | Control;
        getValue: (item: TItem) => TValue;
        setValue?: (item: TItem, value: TValue) => void;
        valueChanged?: (subscriber: (oldValue: TValue, newValue: TValue) => void) => void;
        width?: string;
        footer?: (aggregates: FooterProvider<TValue>) => ColumnFooter<TValue>;
        content?: (item: TItem) => IContentProvider;
    }
}
