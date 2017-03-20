namespace Weclarative.Utils {
    export class Page<T> {
        static readonly Offset = 0;
        static readonly Limit = 25;

        constructor(readonly rows: Array<T>, readonly offset: number, readonly limit: number, readonly totalCount: number) {
        }
    }
}