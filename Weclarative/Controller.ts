﻿abstract class Controller {
    _application: MvcApplication;
    _routeEngine: RouteEngine;

    initialize(application: MvcApplication) {
        this._application = application;
    }

    abstract get path(): string;
    abstract registerRoutes(registrar: (route: string, action: Function) => void): void;

    get application() {
        return this._application;
    }

    get routeEngine(): RouteEngine {
        return this.routeEngine;
    }

    async execute(action: Function): Promise<View>
    {
        const actionResult = await this.application.invokeAction(this, action);
        const view = (actionResult as ViewResult).view;
        view.initialize(this.application.createViewContext(this));
        return view;
    }
}