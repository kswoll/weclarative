class ControllerRegistry {
    private controllers = new Array<Controller>();

    register(controller: Controller) {
        this.controllers.push(controller);
    }

    registerRoutes(routes: RouteEngine) {
        for (const controller of this.controllers) {
            routes.registerController(controller);



            controller.registerRoutes(routes);
        }
    }

    initialize(application: MvcApplication) {
        for (const controller of this.controllers) {
            controller.initialize(application);
        }
    }
}