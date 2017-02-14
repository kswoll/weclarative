class DefaultControllerFactory implements IControllerFactory {
    private dependencyResolver: IDependencyResolver;

    constructor(dependencyResolver: IDependencyResolver) {
        this.dependencyResolver = dependencyResolver;
    }

    createController(context: NavigationContext): Controller {
        var controllerType = context.request.routeData.controller;
        return this.dependencyResolver.getService(controllerType) as Controller;
    }
}