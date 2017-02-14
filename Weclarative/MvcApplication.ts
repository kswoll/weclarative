﻿/// <reference path="Views/Layout.ts" />
/// <reference path="Routes/RouteTree.ts" />

import View = Views.View;
import RouteTree = Routes.RouteTree;
import Layout = Views.Layout;

abstract class MvcApplication {
    private currentPath: string;
    private routeTree: RouteTree;
    private _body = new HtmlControl(document.getElementsByTagName("body")[0]);
    private _view: View;
    private _host: string;
    private _port: string;
    private _scheme: string;
    private _controllerFactory: IControllerFactory;
    private _navigationContext: NavigationContext;
    private _routeEngine: RouteEngine;
    private _controllerRegistry = new ControllerRegistry();

    protected constructor(public dependencyResolver: IDependencyResolver) {
    }

    abstract registerControllers(registry: ControllerRegistry): void;

    get view() {
        return this._view;
    }

    async start() {
        this._host = window.location.host;
        this._port = window.location.port;
        this._scheme = window.location.protocol;

        window.addEventListener("popstate", evt => this.onPopState(evt));

        const path = window.location.pathname;
        console.log(path);

        this.registerControllers(this._controllerRegistry);
        this._controllerRegistry.registerRoutes(this._routeEngine);

        this._controllerFactory = new DefaultControllerFactory(this.dependencyResolver);

        this._routeEngine = new RouteEngine();
    }

    private async onPopState(evt: PopStateEvent) {
        // If state is null then it means it's firing on first load, which we never care about
        const path = <string>evt.state;
        if (path != null && path != this.currentPath)
            await this.open(path, false);
    }

    async open(url: string, pushState: boolean) {
        const parts = url.split("?");
        const path = parts[0];
        const queryString = url.length > 1 ? parts[1] : "";
        this.currentPath = path;
        const view = await this.execute(path, queryString);
        if (pushState)
            window.history.pushState(url, view.title, url);

        this.openView(view);
        this.onOpen(url);
    }

    openView(view: View) {
        document.title = view.title;

        if (this.view instanceof Layout && view.layoutType != null) {
            let layout = this.view as Layout;
            let container = layout.findLayout(view.layoutType);
            (container as Layout).addView(view);
        } else {
            let rootView = view.getRootView();
            if (rootView.content == null)
                throw new Error(`View must provide a valid 'Content' property: ${rootView.constructor.name}`);
            rootView.notifyViewAttached();
            this._body.add(rootView.content);
            this._view = rootView;
        }

        if (this.view instanceof Layout)
        {
            let layout = this._view as Layout;
            let sections = view.sections;
            layout.loadSections(sections);
        }
    }

    protected async execute(path: string, queryString: string): Promise<View> {
        const context = this.createNavigationContext(path, queryString);
        this._navigationContext = context;
        const controller = this._controllerFactory.createController(context);
        await controller.execute(this, context);
        return context.response.view as View;
    }

    private createNavigationContext(path: string, queryString: string): NavigationContext
    {
        // Create http context
        const queryStringDictionary = new Map<string, string>();
        const parts = queryString.split("&");
        for (let part of parts)
        {
            const pair = part.split("=");
            const key = decodeURI(pair[0]);
            const value = decodeURI(pair[1]);
            queryStringDictionary.set(key, value);
        }
        const routeData = this.routeTree.apply(path, "GET");
        const request = new NavigationRequest(path, queryStringDictionary, routeData);
        const response = new NavigationResponse();

        const navigationContext = new NavigationContext(request, response);

        return navigationContext;
    }

    createViewContext(controller: Controller): ViewContext {
        return new ViewContext(controller.controllerContext);
    }

    onOpen(url: string) {
    }
}