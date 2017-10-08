namespace Weclarative.Controls.Grids {
    export class ColumnAggregate<TValue, TRunningTotal, TResult> implements IColumnAggregate<TValue> {
        private runningTotal: TRunningTotal;

        constructor(
            initialValue: TRunningTotal,
            private readonly addAggregator: (runningTotal: TRunningTotal, value: TValue) => TRunningTotal,
            private readonly removeAggregator: (runningTotal: TRunningTotal, value: TValue) => TRunningTotal,
            private readonly resultProvider: (runningTotal: TRunningTotal) => TResult)
        {
            this.runningTotal = initialValue;
        }

        added(value: TValue) {
            this.runningTotal = this.addAggregator(this.runningTotal, value);
        }

        removed(value: TValue) {
            this.runningTotal = this.removeAggregator(this.runningTotal, value);
        }

        get value() {
            return Object(this.resultProvider(this.runningTotal));
        }
    }

    export class ColumnAggregates<TValue> {
        get count() {
            return new ColumnAggregate<TValue, number, number>(0, x => x + 1, x => x - 1, x => x);
        }
    }
}
