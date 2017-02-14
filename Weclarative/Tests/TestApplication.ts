class TestApplication extends MvcApplication {
    constructor() {
        super(new DefaultDependencyResolver());
    }

    registerControllers(registry: ControllerRegistry): void {
        registry.register(new TestController());
    }
}