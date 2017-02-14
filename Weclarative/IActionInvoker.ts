interface IActionInvoker {
    invokeAction(context: ControllerContext, action: Function) : Promise<ActionResult>;
}