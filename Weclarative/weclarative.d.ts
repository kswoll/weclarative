declare abstract class ActionResult {
    abstract executeResult(context: NavigationContext): void;
}
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
    _controllerContext: ControllerContext;
    _navigationContext: NavigationContext;
    _actionInvoker: IActionInvoker;
    _routeEngine: RouteEngine;
    initialize(application: MvcApplication, context: NavigationContext): void;
    setUpRoutes(routes: RouteEngine): void;
    readonly routeEngine: RouteEngine;
    readonly routeData: Routes.RouteData;
    readonly controllerContext: ControllerContext;
    readonly navigationContext: NavigationContext;
    execute(application: MvcApplication, context: NavigationContext): Promise<void>;
}
declare namespace Utils {
    class Reflection {
        private static STRIP_COMMENTS;
        private static ARGUMENT_NAMES;
        static getParameterNames(func: Function): string[];
    }
}
import Reflection = Utils.Reflection;
declare class ControllerActionInvoker implements IActionInvoker {
    invokeAction(context: ControllerContext, action: Function): Promise<ActionResult>;
}
declare class ControllerContext {
    readonly application: MvcApplication;
    readonly navigationContext: NavigationContext;
    readonly controller: Controller;
    constructor(application: MvcApplication, navigationContext: NavigationContext, controller: Controller);
}
declare class HtmlControl extends Control {
    constructor(node: Element);
    add(child: Control): void;
    remove(child: Control): void;
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
interface IActionInvoker {
    invokeAction(context: ControllerContext, action: Function): Promise<ActionResult>;
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
        private _sections;
        readonly sections: Map<string, Control>;
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
declare namespace Views {
    abstract class Layout extends View {
        private subviews;
        constructor();
        addView(view: View): void;
        removeView(view: View): void;
        protected onAddView(view: View): void;
        findLayout(layoutType: string): Layout | null;
        loadSections(sections: Map<string, Control>): void;
    }
}
declare namespace Routes {
    class RouteTree implements IRouteNode {
        rootPaths: RouteNode[];
        readonly children: RouteNode[];
        apply(path: string, method: string): RouteData;
        private findFirstRoute(path, httpMethod);
        private calculateRoute(path, httpMethod, route, node);
        toString(): string;
    }
}
import View = Views.View;
import RouteTree = Routes.RouteTree;
import Layout = Views.Layout;
declare class MvcApplication {
    dependencyResolver: IDependencyResolver;
    private currentPath;
    private routeTree;
    private _body;
    private _view;
    private _host;
    private _port;
    private _scheme;
    private _controllerFactory;
    private _navigationContext;
    private _routeEngine;
    constructor(dependencyResolver: IDependencyResolver);
    readonly view: View;
    start(): Promise<void>;
    private onPopState(evt);
    open(url: string, pushState: boolean): Promise<void>;
    openView(view: View): void;
    protected execute(path: string, queryString: string): Promise<View>;
    private createNavigationContext(path, queryString);
    createViewContext(controller: Controller): ViewContext;
    onOpen(url: string): void;
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
    constructor(path: string, queryString: Map<string, string>, routeData: Routes.RouteData);
}
declare class NavigationResponse {
    view: View | null;
}
declare namespace Routes {
    interface IRouteNode {
        children: Array<RouteNode>;
    }
}
declare namespace Routes {
    interface IRoutePart {
        acceptPath(path: RoutePath, httpMethod: string): boolean;
        processData(path: RoutePath, data: RouteData): void;
        readonly routeData: Map<string, any>;
    }
}
declare namespace Routes {
    class RouteBuilder {
        private parts;
        private pinning;
        pin(): RouteBuilder.Pinned;
        unpin(): void;
        toArray(): IRoutePart[];
        add(part: IRoutePart): void;
    }
    namespace RouteBuilder {
        class Pinned implements IDisposable {
            private builder;
            private accepted;
            constructor(builder: RouteBuilder);
            accept(): void;
            dispose(): void;
        }
    }
}
declare namespace Routes {
    class RouteData {
        static readonly controllerKey: string;
        static readonly actionKey: string;
        static readonly requiredHttpMethodKey: string;
        private values;
        getValue(key: string): any;
        setValue(key: string, value: any): void;
        readonly action: Function;
        readonly controller: string;
        readonly requiredHttpMethod: string;
    }
}
declare class RouteEngine {
    add(path: string, func: Function): void;
}
declare namespace Routes {
    class RouteNode implements IRouteNode {
        part: IRoutePart;
        children: RouteNode[];
        constructor(part: IRoutePart);
        toString(): string;
    }
}
import Strings = Utils.Strings;
declare class RoutePath {
    private _remaining;
    private consumed;
    private pinning;
    constructor(path: string);
    pin(): IDisposable;
    unpin(): void;
    readonly location: number;
    resetLocation(location: number): void;
    any(): boolean;
    readonly remaining: number;
    startsWith(routePath: RoutePath): boolean;
    readonly current: string | null;
    consume(): string;
    consumeAll(): string;
    consumePath(path: RoutePath): void;
    back(): string;
    reset(): void;
    toString(): string;
    private static Pinned;
}
declare class TestApplication extends MvcApplication {
    constructor();
}
declare class TestController extends Controller {
    setUpRoutes(routes: RouteEngine): void;
}
declare class Arrays {
    static areEqual<T>(array1: T[], array2: T[]): boolean;
}
interface IDisposable {
    dispose(): void;
}
declare function using<T extends IDisposable, TResult>(resource: T, action: (resource: T) => TResult): TResult;
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
declare namespace Utils {
    class Strings {
        static chopStart(s: string, prefix: string): string;
        static chopEnd(s: string, suffix: string): string;
    }
}
declare class ViewResult extends ActionResult {
    readonly view: View;
    constructor(view: View);
    executeResult(context: NavigationContext): void;
}
declare class ViewContext {
    readonly controllerContext: ControllerContext;
    constructor(controllerContext: ControllerContext);
}
