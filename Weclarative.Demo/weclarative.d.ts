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
    class MouseTrackingEngine {
        private lastElement;
        private _isMouseDown;
        private mouseDownTarget;
        private wasAtBottom;
        constructor();
        onMouseMove(evt: Event): void;
        private fireMouseEntered(element);
        private fireMouseExited(element);
        private fireMouseUp(element);
        private onMouseOut(evt);
        private onMouseDown(evt);
        private onMouseUp(evt);
        private onWheel(evt);
        readonly isMouseDown: boolean;
    }
}
declare namespace Controls {
    class Control {
        private static mouseTrackingEngine;
        tagName: string;
        private children;
        private isAttachedToDom;
        private _view;
        private _node;
        private _style;
        private _parent;
        private _attachedToDom;
        private _detachedFromDom;
        private _onClick;
        private _onMouseEntered;
        private _onMouseExited;
        private _onMouseUp;
        private _onMouseDown;
        private _onWheel;
        constructor(tagName?: string | null, node?: HTMLElement | null);
        readonly style: CSSStyleDeclaration;
        readonly attachedToDom: EventHandler<void>;
        readonly detachedFromDom: EventHandler<void>;
        node: HTMLElement;
        view: View | null;
        readonly parent: Control | null;
        readonly onClick: IEventHandler<MouseEvent>;
        onJsClick(evt: MouseEvent): void;
        readonly onMouseEntered: IEventHandler<MouseEvent>;
        onJsMouseEntered(evt: Event): void;
        readonly onMouseExited: IEventHandler<MouseEvent>;
        onJsMouseExited(evt: Event): void;
        readonly onMouseDown: EventHandler<MouseEvent>;
        onJsMouseDown(evt: MouseEvent): void;
        readonly onMouseUp: EventHandler<MouseEvent>;
        onJsMouseUp(evt: MouseEvent): void;
        readonly onWheel: EventHandler<MouseEvent>;
        onJsWheel(evt: MouseEvent): void;
        onAddedToView(): void;
        onRemovedFromView(): void;
        protected createNode(): HTMLElement;
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
        static readonly isMouseDown: boolean;
    }
}
declare namespace Controls {
    class AlignmentPanel extends Control {
        static Top(content: Control): AlignmentPanel;
        static Bottom(content: Control): AlignmentPanel;
        static Right(content: Control): AlignmentPanel;
        static Left(content: Control): AlignmentPanel;
        static TopLeft(content: Control): AlignmentPanel;
        static TopRight(content: Control): AlignmentPanel;
        static BottomLeft(content: Control): AlignmentPanel;
        static BottomRight(content: Control): AlignmentPanel;
        static Center(content: Control): AlignmentPanel;
        private _content;
        private cell;
        private cellDiv;
        constructor(content: Control, horizontalAlignment: HorizontalAlignment, verticalAlignment: VerticalAlignment);
        content: Control | null;
        createNode(): HTMLTableElement;
    }
}
declare namespace Controls {
    class CenteredPanel extends Control {
        private _content;
        private contentContainer;
        constructor(content?: Control);
        content: Control | null;
        createNode(): HTMLDivElement;
    }
}
declare namespace Controls {
    class CheckBox extends Control {
        readonly onChanged: EventHandler<void>;
        private label;
        private checkbox;
        constructor(text?: string);
        text: string;
        createNode(): HTMLSpanElement;
        onJsChanged(evt: Event): void;
        isChecked: boolean;
    }
}
declare namespace Controls {
    /**
     * Renders the content by setting width/height at 100% so that it fills inside the parent element
     */
    class FillPanel extends Control {
        private _content;
        constructor(content?: Control);
        createNode(): HTMLElement;
        content: Control | null;
    }
}
declare namespace Controls {
    class FixedPanel extends Control {
        private _content;
        constructor(content: Control, width: number, height: number);
        content: Control | null;
    }
}
declare namespace Controls {
    enum HorizontalAlignment {
        Left = 0,
        Center = 1,
        Right = 2,
        Fill = 3,
    }
}
declare namespace Utils {
    class Elements {
        /**
         * If offsetHeight is non-zero, will return that. Otherwise will temporarily place the element in a hidden
         * container in order to get a valid offsetHeight value.
         */
        static measureOffsetHeight(element: HTMLElement): number;
        static insertAfter(parent: Node, child: Node, referenceNode: Node): void;
        static prepend(parent: Node, child: Node): void;
    }
}
declare namespace Controls {
    class HorizontalPanel extends Control {
        spacing: number;
        defaultAlignment: VerticalAlignment;
        private row;
        private firstSpacer;
        private lastSpacer;
        private _horizontalAlignment;
        constructor(spacing?: number);
        horizontalAlignment: HorizontalAlignment;
        createNode(): HTMLTableElement;
        add(child: Control, alignment?: VerticalAlignment, spaceBefore?: number): void;
    }
}
declare namespace Controls {
    class HtmlControl extends Control {
        constructor(node: HTMLElement);
        add(child: Control): void;
        remove(child: Control): void;
    }
}
declare namespace Controls {
    class InlineControl extends Control {
        constructor(tagName?: string | null, node?: HTMLElement | null);
    }
}
declare namespace Controls {
    class ListBox<T> extends Control {
        private readonly items;
        private readonly textProvider;
        private readonly valueProvider;
        private readonly selectElement;
        private onChanged;
        constructor(textProvider?: (item: T) => string, valueProvider?: (item: T) => string);
        isDropDown: boolean;
        createNode(): HTMLSelectElement;
        add(item: T): void;
        remove(item: T): void;
        createOption(item: T): HTMLOptionElement;
        formatValue(item: T): string;
        onJsChanged(evt: Event): void;
        isMultiselect: boolean;
        selectedItem: T | null;
        selectedItems: Array<T>;
    }
}
declare namespace Controls {
    class ListView<T> extends Control {
        highlightColor: string;
        highlightTextColor: string;
        selectedColor: string;
        selectedTextColor: string;
        private readonly _items;
        private readonly childControls;
        private readonly textProvider;
        private readonly list;
        private _onChanged;
        private _selectedIndex;
        constructor(textProvider?: (item: T) => string);
        add(item: T): void;
        remove(item: T): void;
        clear(): void;
        readonly items: T[];
        selectedIndex: number;
        readonly onChanged: IEventHandler<void>;
        selectedItem: T | undefined;
        private createRow(item);
        selectNextItem(): void;
        selectPreviousItem(): void;
    }
}
declare namespace Controls {
    class SidePanel extends Control {
        private _top;
        private _bottom;
        private _left;
        private _right;
        private _center;
        private _spacing;
        private topRow;
        private bottomRow;
        private middleRow;
        private topCell;
        private bottomCell;
        private leftCell;
        private rightCell;
        private centerCell;
        private topCellContent;
        private bottomCellContent;
        private leftCellContent;
        private rightCellContent;
        private centerCellContent;
        constructor(spacing?: number);
        private getTopRow();
        private getMiddleRow();
        private getBottomRow();
        private getTopCell();
        private getBottomCell();
        private adjustColSpan();
        private getLeftCell();
        private getCenterCell();
        private getRightCell();
        private removeTopRow();
        private removeMiddleRow();
        private removeBottomRow();
        private removeMiddleRowIfEmpty();
        private removeTopCell();
        private removeBottomCell();
        private removeLeftCell();
        private removeCenterCell();
        private removeRightCell();
        top: Control | null;
        bottom: Control | null;
        left: Control | null;
        center: Control | null;
        right: Control | null;
        spacing: number;
    }
}
declare namespace Controls {
    class TablePanel extends Control {
        defaultConstraint: TablePanelConstraint;
        private table;
        private columnWidths;
        private rows;
        private cells;
        private _verticalCellSpacing;
        private _horizontalCellSpacing;
        constructor(...columnWidths: TablePanelWidth[]);
        verticalCellSpacing: number;
        horizontalCellSpacing: number;
        cellSpacing: number;
        resetCellSpacing(): void;
        createNode(): HTMLElement;
        getNextEmptyCell(): TablePanelPoint;
        add(cell: Control, constraint?: TablePanelConstraint): HTMLDivElement;
    }
}
declare namespace Controls {
    class TablePanelConstraint {
        readonly horizontalAlignment: HorizontalAlignment;
        readonly verticalAlignment: VerticalAlignment;
        readonly columnSpan: number;
        readonly rowSpan: number;
        static horizontalAlignment(alignment: HorizontalAlignment): TablePanelConstraint;
        static verticalAlignment(alignment: VerticalAlignment): TablePanelConstraint;
        static spanCols(span: number): TablePanelConstraint;
        static spanRows(span: number): TablePanelConstraint;
        static centered(): TablePanelConstraint;
        static left(): TablePanelConstraint;
        static right(): TablePanelConstraint;
        static topLeft(): TablePanelConstraint;
        static topCenter(): TablePanelConstraint;
        static topRight(): TablePanelConstraint;
        static middleLeft(): TablePanelConstraint;
        static middleRight(): TablePanelConstraint;
        static bottomLeft(): TablePanelConstraint;
        static bottomCenter(): TablePanelConstraint;
        static bottomRight(): TablePanelConstraint;
        constructor(horizontalAlignment?: HorizontalAlignment, verticalAlignment?: VerticalAlignment, columnSpan?: number, rowSpan?: number);
    }
}
declare namespace Controls {
    class TablePanelPoint {
        x: number;
        y: number;
        constructor(x: number, y: number);
    }
}
declare namespace Controls {
    class TablePanelWidth {
        readonly value: number;
        readonly style: TablePanelWidthStyle;
        static percent(value: number): TablePanelWidth;
        static exact(value: number): TablePanelWidth;
        static weight(value?: number): TablePanelWidth;
        static preferred(value?: number): TablePanelWidth;
        static allPreferred(numberOfColumns: number): TablePanelWidth[];
        static allWeight(numberOfColumns: number): TablePanelWidth[];
        constructor(value: number, style?: TablePanelWidthStyle);
    }
}
declare namespace Controls {
    enum TablePanelWidthStyle {
        Pixels = 0,
        Percent = 1,
        Weight = 2,
        MaxPreferredWidth = 3,
    }
}
declare namespace Controls {
    class TextBlock extends InlineControl {
        constructor(value?: string, tagName?: string);
        value: string;
    }
}
declare namespace Controls {
    class TextBox extends Control {
        private onChanged;
        private inputElement;
        constructor();
        type: TextBoxType;
        name: string | null;
        placeholder: string | null;
        maxLength: number | null;
        createNode(): HTMLInputElement;
        private onJsChanged(evt);
        text: string;
    }
}
declare namespace Controls {
    enum TextBoxType {
        Text = 0,
        Password = 1,
        Color = 2,
        Email = 3,
        Number = 4,
        Range = 5,
        Search = 6,
        Telephone = 7,
        Url = 8,
        Date = 9,
        DateTime = 10,
        Time = 11,
    }
}
declare namespace Controls {
    class TitledPanel extends Control {
        private legend;
        private contentDiv;
        private _content;
        constructor(title?: string);
        createNode(): HTMLFieldSetElement;
        title: string;
        content: Control | null;
    }
}
declare namespace Controls {
    enum VerticalAlignment {
        Top = 0,
        Middle = 1,
        Bottom = 2,
        Fill = 3,
    }
}
import Elements = Utils.Elements;
declare namespace Controls {
    class VerticalPanel extends Control {
        defaultAlignment: HorizontalAlignment;
        private static readonly animationSpeed;
        private table;
        private firstSpacer;
        private lastSpacer;
        private _spacing;
        private _verticalAlignment;
        constructor(defaultAlignment?: HorizontalAlignment);
        verticalAlignment: VerticalAlignment;
        spacing: number;
        createNode(): HTMLElement;
        add(child: Control, alignment?: HorizontalAlignment, spaceAbove?: number, animate?: boolean): void;
        internalAdd(child: Control, alignment: HorizontalAlignment, spaceAbove: number, animate: boolean): HTMLElement;
        insertBefore(child: Control, insertBefore: Control, alignment?: HorizontalAlignment, spaceAbove?: number, animate?: boolean): void;
        insertAfter(child: Control, insertAfter: Control, alignment?: HorizontalAlignment, spaceAbove?: number, animate?: boolean): void;
        replace(oldChild: Control, newChild: Control): void;
        remove(child: Control, animate?: boolean): void;
        removeChild(child: Control): void;
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
        add(controller: Controller, parentNode: IRouteNode, route: string, action: Function, isDefault?: boolean): void;
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
declare abstract class MvcApplication {
    /**
     * Implement this method to instantiate and register all the controllers in your application.
     *
     * @param registry Call the register method passing in a new controller for each controller in your application.
     */
    abstract registerControllers(registry: ControllerRegistry): void;
    static instance: MvcApplication;
    onBottomBounced: EventHandler<void>;
    private currentPath;
    private routeTree;
    private _body;
    private _view;
    private _host;
    private _port;
    private _scheme;
    private _controllerRegistry;
    protected constructor();
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
    notifyOnBottomBounced(): void;
}
declare namespace Utils {
    type FrameHandler = (progress: number) => void;
    class Animator {
        static animate(frame: FrameHandler, duration: number, onDone?: () => void): void;
    }
}
declare namespace Utils {
    class Promises {
        static delay(timeout: number): Promise<{}>;
    }
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
    static remove<T>(array: Array<T>, element: T): void;
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
declare class ProxyEventHandler<T> implements IEventHandler<T> {
    addHandler: (handler: (data?: T) => void) => void;
    removeHandler: (handler: (data?: T) => void) => void;
    constructor(addHandler: (handler: (data?: T) => void) => void, removeHandler: (handler: (data?: T) => void) => void);
    add(handler: (data?: T) => void): void;
    remove(handler: (data?: T) => void): void;
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
