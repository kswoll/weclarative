class LayoutType {
    constructor(readonly type: string, readonly factory: () => Layout) {
    }
}