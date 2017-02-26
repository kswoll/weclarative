Weclarative.MvcApplication.load(() => new App());

class App extends Weclarative.MvcApplication {
    constructor() {
        super();
    }

    registerControllers(registry: Weclarative.ControllerRegistry): void {
        registry.register(new TestController());
        registry.register(new Demos.DemoController());
    }
}