class ViewResult extends ActionResult {
    constructor(readonly view: View) {
        super();
    }

    executeResult(context: NavigationContext) {
    }
}