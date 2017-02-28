Weclarative.MvcApplication.load(() => new App());

class App extends Weclarative.MvcApplication {
    readonly testController = new TestController();
    readonly demoController = new Demos.DemoController();

    constructor() {
        super();
    }

    registerControllers(registry: Weclarative.ControllerRegistry): void {
        for (const property of Object.getOwnPropertyNames(this)) {
            const propertyValue = (this as any)[property];
            if (propertyValue instanceof Controller) {
                const controller = propertyValue as Controller;
                registry.register(controller);                
            }
        }
//        registry.register(new TestController());
//        registry.register(new Demos.DemoController());
    }
}