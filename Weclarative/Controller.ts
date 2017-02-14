class Controller {
    _controllerContext: ControllerContext;
    _navigationContext: NavigationContext;
    _actionInvoker: IActionInvoker;

    initialize(application: MvcApplication, context: NavigationContext) {
        this._navigationContext = context;
        this._actionInvoker = new ControllerActionInvoker();
        this._controllerContext = new ControllerContext(application, context, this);
    }

    get routeData() {
        return this.navigationContext.request.routeData;
    }

    get controllerContext() {
        return this._controllerContext;
    }

    get navigationContext() {
        return this._navigationContext;
    }

    async execute(application: MvcApplication, context: NavigationContext)
    {
        this.initialize(application, context);
        var action = context.request.routeData.action;
        var actionResult = await this._actionInvoker.invokeAction(this._controllerContext, action);
        var view = (actionResult as ViewResult).view;
        view.initialize(application.createViewContext(this));
        context.response.view = view;
    }
}