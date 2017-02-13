declare namespace Controls {
    class Control {
        tagName: string;
        private children;
        private isAttachedToDom;
        private _view;
        private _node;
        private _style;
        private _parent;
        private _attachedToDom;
        private _detachedFromDom;
        constructor(tagName?: string | null, node?: Element | null);
        readonly attachedToDom: EventHandler<void>;
        readonly detachedFromDom: EventHandler<void>;
        node: Element;
        view: View | null;
        readonly parent: Control | null;
        onAddedToView(): void;
        onRemovedFromView(): void;
        protected createNode(): Element;
        protected addChild(child: Control): void;
        protected removeChild(child: Control): void;
        protected onRemove(child: Control): void;
        protected removeAll(): void;
        get(index: number): Control;
        readonly count: number;
        protected onAdded(): void;
        protected onRemoved(): void;
        protected onAttachedToDom(): void;
        protected onDetachedFromDom(): void;
    }
}
import Control = Controls.Control;
declare class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;
    constructor(element: HTMLElement);
    start(): void;
    stop(): void;
}
declare class Controller {
}
declare class ControllerContext {
    application: MvcApplication;
    constructor(application: MvcApplication);
}
declare class HtmlControl extends Control {
    constructor(node: Element);
    add(child: Control): void;
    void: any;
}
declare namespace Controls {
    class InlineControl extends Control {
        constructor(tagName?: string | null, node?: Element | null);
    }
}
declare namespace Controls {
    class Text extends InlineControl {
        constructor(value?: string);
        value: string;
    }
}
declare class DefaultControllerFactory implements IControllerFactory {
    private dependencyResolver;
    constructor(dependencyResolver: IDependencyResolver);
    createController(context: NavigationContext): Controller;
}
interface Window {
    [key: string]: any;
}
declare class DefaultDependencyResolver implements IDependencyResolver {
    getService(type: string, parameters?: Map<string, any>): any;
}
interface IControllerFactory {
    createController(context: NavigationContext): Controller;
}
interface IDependencyResolver {
    getService(type: string, parameters?: Map<string, any>): any;
}
declare namespace Views {
    class View {
        title: string;
        layoutType: string;
        private isInitialized;
        private attached;
        private detached;
        private _content;
        private _layout;
        private _viewContext;
        content: Control | null;
        readonly viewContext: ViewContext;
        notifyViewAttached(): void;
        notifyViewDetached(): void;
        protected onViewAttached(): void;
        protected onViewDetached(): void;
        getRootView(): View;
        verifyLayouts(): void;
        protected createLayout(): Layout;
        initialize(context: ViewContext): void;
        protected onInitialize(): void;
    }
}
import View = Views.View;
declare class MvcApplication {
    dependencyResolver: IDependencyResolver;
    private currentPath;
    private _view;
    private _host;
    private _port;
    private _scheme;
    private _controllerFactory;
    constructor(dependencyResolver: IDependencyResolver);
    readonly view: View;
    start(): Promise<void>;
    private onPopState(evt);
    open(url: string, pushState: boolean): Promise<void>;
    openView(view: View): void;
    protected execute(path: string, queryString: string): Promise<View>;
}
declare class NavigationContext {
    request: NavigationRequest;
    response: NavigationResponse;
    constructor(request: NavigationRequest, response: NavigationResponse);
}
declare class NavigationRequest {
    path: string;
    queryString: Map<string, string>;
    routeData: Routes.RouteData;
    /**
     *  Contains the portion of the url after the host/port and before the query string.
     */
    constructor(path: string);
}
declare class NavigationResponse {
    view: View;
    constructor(view: View);
}
declare namespace Routes {
    class RouteData {
        static readonly controllerKey: string;
        static readonly actionKey: string;
        static readonly requiredHttpMethodKey: string;
        private values;
        getValue(key: string): any;
        setValue(key: string, value: any): void;
        readonly action: string;
        readonly controller: string;
        readonly requiredHttpMethod: string;
    }
}
declare class TestApplication extends MvcApplication {
    constructor();
}
interface IEventHandler<T> {
    add(handler: {
        (data?: T): void;
    }): void;
    remove(handler: {
        (data?: T): void;
    }): void;
}
declare class EventHandler<T> implements IEventHandler<T> {
    private handlers;
    add(handler: {
        (data?: T): void;
    }): void;
    remove(handler: {
        (data?: T): void;
    }): void;
    trigger(data?: T): void;
}
declare class ViewContext {
    readonly controllerContext: ControllerContext;
    constructor(controllerContext: ControllerContext);
}
declare abstract class Layout extends View {
    private subviews;
    constructor();
    addView(view: View): void;
    removeView(view: View): void;
    protected onAddView(view: View): void;
    findLayout(layoutType: string): Layout | null;
    loadSections(sections: {
        [section: string]: Control;
    }): void;
}
