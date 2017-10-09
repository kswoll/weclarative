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
        createNumber<TRunningTotal, TResult>(
            initialValue: TRunningTotal,
            addAggregator: (runningTotal: TRunningTotal, value: number) => TRunningTotal,
            removeAggregator: (runningTotal: TRunningTotal, value: number) => TRunningTotal,
            resultProvider: (runningTotal: TRunningTotal) => TResult)
        {
            return new ColumnAggregate<number, TRunningTotal, TResult>(initialValue, addAggregator, removeAggregator, resultProvider);
        }

        create<TAggregateValue = TValue, TRunningTotal = number, TResult = number>(
            initialValue: TRunningTotal,
            addAggregator: (runningTotal: TRunningTotal, value: TAggregateValue) => TRunningTotal,
            removeAggregator: (runningTotal: TRunningTotal, value: TAggregateValue) => TRunningTotal,
            resultProvider: (runningTotal: TRunningTotal) => TResult)
        {
            return new ColumnAggregate<TAggregateValue, TRunningTotal, TResult>(initialValue, addAggregator, removeAggregator, resultProvider);
        }

        get count() {
            return this.create(0, x => x + 1, x => x - 1, x => x);
        }

        get sum() {
            return this.createNumber(0, (x, value) => x + value, (x, value) => x - value, x => x);
        }

        get average() {
            return this.createNumber([0, 0], (x, value) => [x[0] + value, x[1] + 1], (x, value) => [x[0] - value, x[1] - 1], x => x[0] / x[1]);
        }
    }
}
