/**
 * Your standard Controller in the MVC pattern.  This class is responsible for grouping related actions
 * and associating routes with actions.  Actions are represented as methods, and the mapping is registered
 * by implementing the abstract registerRoutes(...) method.
 */
abstract class Controller {
    _application: MvcApplication;
    _routeEngine: RouteEngine;

    initialize(application: MvcApplication) {
        this._application = application;
    }

    /**
     * Implement in your subclass and return the prefix that should apply to this controller.  For example,
     * if your controller represents access to an entity Foo, maybe return the string "foo" so that all your
     * actions that you register in registerRoutes are assumed to have that prefix.  For one off exceptions
     * to that, you can prefix the route passed to the registrar with a "/" which makes it absolute and
     * disregards the path returned here.  If you return the empty string, then the routes passed to the
     * registerRoutes are presumed to be root-level.
     */
    abstract get path(): string;

    /**
     * Implement this method and call registrar to add routes/actions to your controller.
     * @param registrar The callback through which you register routes to actions.  The route argument is the
     * path to your action, and unless it starts with "/" it is assumed to be a subpath of the path returned
     * by this controller.  The action should be a method defined on your controller that implements this route.
     * The method should return a View, and its arguments are computed based on variables defined in the route.
     */
    abstract registerRoutes(registrar: (route: string, action: Function) => void): void;

    /**
     * The applicatio responsible for instantiating this controller.
     * @returns {} 
     */
    get application() {
        return this._application;
    }

    get routeEngine(): RouteEngine {
        return this.routeEngine;
    }

    async execute(action: Function, viewRequest: ViewRequest): Promise<View>
    {
        const view = await this.application.invokeAction(this, action, viewRequest);
        view.initialize(new ViewContext(this));
        return view;
    }
}