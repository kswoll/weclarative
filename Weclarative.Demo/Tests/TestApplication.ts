namespace Tests {
    export class TestApplication extends MvcApplication {
        constructor() {
            super();
        }

        registerControllers(registry: ControllerRegistry): void {
            registry.register(new TestController());
        }
    }
}