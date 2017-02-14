class ControllerRegistry {
    private controllers = new Array<Controller>();

    register(controller: Controller) {
        this.controllers.push(controller);
    }

    registerRoutes(routes: RouteEngine) {
        for (const controller of this.controllers) {
            controller.
        }
    }
}