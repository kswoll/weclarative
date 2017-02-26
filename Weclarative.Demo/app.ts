MvcApplication.load(() => new App());

class App extends MvcApplication {
    constructor() {
        super();
    }

    registerControllers(registry: ControllerRegistry): void {
        registry.register(new TestController());
        registry.register(new Demos.DemoController());
    }
}