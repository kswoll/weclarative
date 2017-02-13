/// <reference path="Views/View.ts" />

import View = Views.View;

class MvcApplication {
    private currentPath: string;
    private _view: View;
    private _host: string;
    private _port: string;
    private _scheme: string;
    private _controllerFactory: IControllerFactory;

    constructor(public dependencyResolver: IDependencyResolver) {
    }

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

        this._controllerFactory = new DefaultControllerFactory(this.dependencyResolver);
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
        const queryString = url.length > 1 ? parts[1] : null;
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
            container.addView(view);
        } else {
            let rootView = view.getRootView();
            if (rootView.content == null)
                throw new Error(`View must provide a valid 'Content' property: ${rootView.constructor.name}`);
            rootView.notifyViewAttached();
            this.body.add(rootView.Content);
            this._view = rootView;
        }

        if (this.view instanceof Layout)
        {
            let layout = (Layout)View;
            let sections = view.sections;
            layout.loadSections(sections);
        }
    }

    protected async execute(path: string, queryString: string): Promise<View> {
        let context = this.createNavigationContext(path, queryString);
        NavigationContext = context;
        var controller = this.controllerFactory.CreateController(context);
        await controller.Execute(this, context);
        return context.Response.View;
    }
}