namespace Weclarative {
    export class LayoutType {
        constructor(readonly type: string, readonly factory: () => Views.Layout) {
        }
    }
}