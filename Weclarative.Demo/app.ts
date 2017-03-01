Weclarative.MvcApplication.load(() => new App());

class App extends Weclarative.MvcApplication {
    static get instance() {
        return Weclarative.MvcApplication.instance as App;
    }

    readonly testController = new TestController();
    readonly demoController = new Demos.DemoController();
}