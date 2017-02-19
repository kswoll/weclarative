/**
 * Your standard Controller in the MVC pattern.  This class is responsible for grouping related actions
 * and associating routes with actions.  Actions are represented as methods, and the mapping is registered
 * by implementing the abstract registerRoutes(...) method.
 */
declare abstract class Controller {
    _application: MvcApplication;
    _routeEngine: RouteEngine;
    initialize(application: MvcApplication): void;
    /**
     * Implement in your subclass and return the prefix that should apply to this controller.  For example,
     * if your controller represents access to an entity Foo, maybe return the string "foo" so that all your
     * actions that you register in registerRoutes are assumed to have that prefix.  For one off exceptions
     * to that, you can prefix the route passed to the registrar with a "/" which makes it absolute and
     * disregards the path returned here.  If you return the empty string, then the routes passed to the
     * registerRoutes are presumed to be root-level.
     */
    readonly abstract path: string;
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
    readonly application: MvcApplication;
    readonly routeEngine: RouteEngine;
    execute(action: Function, viewRequest: ViewRequest): Promise<View>;
}
declare class ControllerRegistry {
    private controllers;
    register(controller: Controller): void;
    registerRoutes(routes: RouteEngine): void;
    initialize(application: MvcApplication): void;
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
declare namespace Controls {
    class HtmlControl extends Control {
        constructor(node: Element);
        add(child: Control): void;
        remove(child: Control): void;
    }
}
declare namespace Controls {
    class InlineControl extends Control {
        constructor(tagName?: string | null, node?: Element | null);
    }
}
declare namespace Controls {
    class TextBlock extends InlineControl {
        constructor(value?: string);
        value: string;
    }
}
interface Window {
    [key: string]: any;
}
declare class LayoutType {
    readonly type: string;
    readonly factory: () => Layout;
    constructor(type: string, factory: () => Layout);
}
declare namespace Views {
    class View {
        title: string;
        layoutType: LayoutType;
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
import Control = Controls.Control;
declare namespace Views {
    abstract class Layout extends View {
        readonly layoutType: LayoutType;
        private subviews;
        constructor(layoutType: LayoutType);
        addView(view: View): void;
        removeView(view: View): void;
        protected onAddView(view: View): void;
        findLayout(layoutType: LayoutType): Layout | null;
        loadSections(sections: Map<string, Control>): void;
    }
}
declare namespace Routes {
    class RouteTree implements IRouteNode {
        rootPaths: RouteNode[];
        readonly children: RouteNode[];
        apply(path: string): RouteData;
        private findFirstRoute(path);
        private calculateRoute(path, route, node);
        toString(): string;
    }
}
declare namespace Routes {
    class RouteData {
        static readonly controllerKey: string;
        static readonly actionKey: string;
        private values;
        getValue(key: string): any;
        setValue(key: string, value: any): void;
        readonly action: Function;
        readonly controller: string;
    }
}
declare namespace Routes {
    class RouteEngine {
        routeTree: RouteTree;
        registerController(controller: Controller): void;
        add(controller: Controller, parentNodes: Array<RouteNode>, route: string, action: Function, isDefault?: boolean): void;
        addNode(parent: IRouteNode, child: RouteNode): RouteNode;
        generateTree(): RouteTree;
    }
}
declare namespace Utils {
    class Strings {
        static chopStart(s: string, prefix: string): string;
        static chopEnd(s: string, suffix: string): string;
        static isNullOrEmpty(s: string | null): boolean;
    }
}
import View = Views.View;
import RouteTree = Routes.RouteTree;
import Layout = Views.Layout;
import RouteEngine = Routes.RouteEngine;
import HtmlControl = Controls.HtmlControl;
/**
 * The top-level application responsible for driving the rest of the behavior of your entire application.  In
 * principle, this class could have provided a singleton access to it, but in the interests of keeping
 * dependencies explicit, and to facilitate potential unit-testig, references to the application is always
 * explicit and derived from some contextual object.
 */
export declare abstract class MvcApplication {
    private currentPath;
    private routeTree;
    private _body;
    private _view;
    private _host;
    private _port;
    private _scheme;
    private _controllerRegistry;
    protected constructor();
    abstract registerControllers(registry: ControllerRegistry): void;
    readonly view: View;
    readonly currentUrl: string;
    start(): Promise<void>;
    private onStarting();
    private onStarted();
    private onPopState(evt);
    open(url: string, pushState: boolean): Promise<void>;
    openView(view: View): void;
    protected execute(path: string, queryString: string): Promise<View>;
    private createViewRequest(path, queryString);
    onOpen(url: string): void;
    invokeAction(controller: Controller, action: Function, viewRequest: ViewRequest): Promise<View>;
}
declare class ViewRequest {
    path: string;
    queryString: Map<string, string>;
    routeData: Routes.RouteData;
    /**
     *  Contains the portion of the url after the host/port and before the query string.
     */
    constructor(path: string, queryString: Map<string, string>, routeData: Routes.RouteData);
}
declare namespace Routes {
    interface IRouteConstraint {
        accept(path: RoutePath): boolean;
    }
}
declare namespace Routes {
    interface IRouteNode {
        children: Array<RouteNode>;
    }
}
declare namespace Routes {
    interface IRoutePart {
        acceptPath(path: RoutePath): boolean;
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
    abstract class RoutePart implements IRoutePart {
        abstract acceptPath(path: RoutePath): boolean;
        private _routeData;
        protected constructor();
        readonly routeData: Map<string, any>;
        processData(path: RoutePath, data: RouteData): void;
        consumePath(path: RoutePath): void;
    }
}
declare namespace Routes {
    class RouteDefault extends RoutePart {
        constructor();
        acceptPath(path: RoutePath): boolean;
        consumePath(path: RoutePath): void;
        toString(): string;
    }
}
declare namespace Routes {
    class RouteLiteral extends RoutePart {
        readonly literal: string;
        readonly isTerminal: boolean;
        constructor(literal: string, isTerminal: boolean);
        acceptPath(path: RoutePath): boolean;
        toString(): string;
    }
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
declare namespace Utils {
    class Convert {
        static to(value: any, type: string): any;
    }
}
import Convert = Utils.Convert;
declare namespace Routes {
    class RouteVariable extends RoutePart {
        readonly isTerminal: boolean;
        readonly parameter: string;
        readonly parameterType: string;
        constraints: IRouteConstraint[];
        constructor(isTerminal: boolean, parameter: string, parameterType: string);
        acceptPath(path: RoutePath): boolean;
        consumePath(path: RoutePath): void;
        processData(path: RoutePath, data: RouteData): void;
        toString(): string;
    }
}
declare class Arrays {
    static areEqual<T>(array1: T[], array2: T[]): boolean;
    static find<T>(array: Array<T>, predicate: (x: T) => boolean): T | null;
    static toMap<T, TKey, TValue>(array: Array<T>, getKey: (item: T) => TKey, getValue: (item: T) => TValue): Map<TKey, TValue>;
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
    class Reflection {
        private static STRIP_COMMENTS;
        private static ARGUMENT_NAMES;
        static getParameterNames(func: Function): string[];
    }
}
declare class ViewContext {
    readonly controller: Controller;
    constructor(controller: Controller);
}