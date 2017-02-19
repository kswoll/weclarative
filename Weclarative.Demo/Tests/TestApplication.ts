import * as Weclarative from "weclarative";
import MvcApplication = Weclarative.MvcApplication;

namespace Tests {
    class TestApplication extends MvcApplication {
        constructor() {
            super();
        }

        registerControllers(registry: ControllerRegistry): void {
            registry.register(new TestController());
        }
    }
}