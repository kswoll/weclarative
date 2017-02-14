/// <reference path="Utils/Reflection.ts" />

import Reflection = Utils.Reflection;

class ControllerActionInvoker implements IActionInvoker {
    invokeAction(context: ControllerContext, action: Function): Promise<ActionResult> {
        const parameters = Reflection.getParameterNames(action);
        const args = new Array<any>(parameters);
        for (let i = 0; i < parameters.length; i++) {
            const key = parameters[i];
            let value: any;
            if (context.navigationContext.request.queryString.has(key))
                value = context.navigationContext.request.queryString.get(key);
            else
                value = context.controller.routeData.getValue(key);
            args[i] = value;
        }

        // If async
        const result: any = action.apply(context.controller, args);
        if (result instanceof Promise) {
            return result;
        } else {
            return Promise.resolve(result);
        }
    }

}