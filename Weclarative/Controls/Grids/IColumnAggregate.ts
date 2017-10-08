namespace Weclarative.Controls.Grids {
    export interface IColumnAggregate<TValue> {
        added(value: TValue): void;
        removed(value: TValue): void;
        readonly value: TValue;
    }
}
