namespace Weclarative {
    export class ControllerRegistry {
        private controllers = new Array<Controller>();

        register<T extends Controller>(controller: T) {
            this.controllers.push(controller);
            return controller;
        }

        registerRoutes(routes: Routes.RouteEngine) {
            for (const controller of this.controllers) {
                routes.registerController(controller);
            }
        }

        initialize(application: MvcApplication) {
            for (const controller of this.controllers) {
                controller.initialize(application);
            }
        }
    }
}