interface IControllerFactory {
    createController(context: NavigationContext): Controller;
}