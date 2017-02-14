abstract class Controller {
    _controllerContext: ControllerContext;
    _navigationContext: NavigationContext;
    _actionInvoker: IActionInvoker;
    _routeEngine: RouteEngine;

    initialize(application: MvcApplication, context: NavigationContext) {
        this._navigationContext = context;
        this._actionInvoker = new ControllerActionInvoker();
        this._controllerContext = new ControllerContext(application, context, this);
    }

    abstract registerRoutes(routes: RouteEngine): void;

    get routeEngine(): RouteEngine {
        return this.routeEngine;
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
        const action = context.request.routeData.action;
        const actionResult = await this._actionInvoker.invokeAction(this._controllerContext, action);
        const view = (actionResult as ViewResult).view;
        view.initialize(application.createViewContext(this));
        context.response.view = view;
    }
}