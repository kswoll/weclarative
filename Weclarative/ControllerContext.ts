class ControllerContext {
    constructor(readonly application: MvcApplication, readonly navigationContext: NavigationContext, readonly controller: Controller) {}
}