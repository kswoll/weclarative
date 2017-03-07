var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var Weclarative;
(function (Weclarative) {
    var Utils;
    (function (Utils) {
        class Animator {
            static animate(frame, duration, onDone) {
                let start = null;
                const step = (timestamp) => {
                    start = start || timestamp;
                    const progress = (timestamp - start) / duration;
                    frame(progress);
                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    }
                    else if (onDone) {
                        onDone();
                    }
                };
                window.requestAnimationFrame(step);
            }
        }
        Utils.Animator = Animator;
    })(Utils = Weclarative.Utils || (Weclarative.Utils = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Utils;
    (function (Utils) {
        class Arrays {
            static areEqual(array1, array2) {
                if (array1.length != array2.length)
                    return false;
                for (let i = 0; i < array1.length; i++) {
                    const o1 = array1[i];
                    const o2 = array2[i];
                    if ((o1 == null && o2 != null) || (o1 != null && o2 == null))
                        return false;
                    if (o1 != o2)
                        return false;
                }
                return true;
            }
            static find(array, predicate) {
                for (const item of array) {
                    if (predicate(item))
                        return item;
                }
                return null;
            }
            static toMap(array, getKey, getValue) {
                const map = new Map();
                for (const item of array) {
                    map.set(getKey(item), getValue(item));
                }
                return map;
            }
            static remove(array, element) {
                const index = array.indexOf(element);
                if (index != -1)
                    array.splice(index, 1);
            }
        }
        Utils.Arrays = Arrays;
    })(Utils = Weclarative.Utils || (Weclarative.Utils = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Utils;
    (function (Utils) {
        class Convert {
            static to(value, type) {
                if (type == "number" && typeof (value) == "string") {
                    return Number(value);
                }
                return undefined;
            }
        }
        Utils.Convert = Convert;
    })(Utils = Weclarative.Utils || (Weclarative.Utils = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Utils;
    (function (Utils) {
        function using(resource, action) {
            try {
                return action(resource);
            }
            finally {
                resource.dispose();
            }
        }
        Utils.using = using;
    })(Utils = Weclarative.Utils || (Weclarative.Utils = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Utils;
    (function (Utils) {
        class Elements {
            /**
             * If offsetHeight is non-zero, will return that. Otherwise will temporarily place the element in a hidden
             * container in order to get a valid offsetHeight value.
             */
            static measureOffsetHeight(element) {
                if (document.body.contains(element))
                    return element.offsetHeight;
                if (element.parentNode != null)
                    throw new Error("Do not use this method on an element that has already been attached to a parent but is not part of the document.");
                const measuringContainer = document.createElement("div");
                measuringContainer.style.position = "absolute";
                measuringContainer.style.visibility = "hidden";
                document.body.appendChild(measuringContainer);
                measuringContainer.appendChild(element);
                const result = element.offsetHeight;
                measuringContainer.removeChild(element);
                document.body.removeChild(measuringContainer);
                return result;
            }
            static insertAfter(parent, child, referenceNode) {
                const nextReferenceNode = referenceNode.nextSibling;
                if (nextReferenceNode == null)
                    parent.appendChild(child);
                else
                    parent.insertBefore(child, nextReferenceNode);
            }
            static prepend(parent, child) {
                parent.insertBefore(child, parent.firstChild);
            }
            static insertBefore(child, referenceNode) {
                referenceNode.parentElement.insertBefore(child, referenceNode);
            }
            static clear(parent) {
                while (parent.firstChild != null) {
                    parent.removeChild(parent.firstChild);
                }
            }
        }
        Utils.Elements = Elements;
    })(Utils = Weclarative.Utils || (Weclarative.Utils = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Utils;
    (function (Utils) {
        class EventHandler {
            constructor() {
                this.handlers = [];
            }
            add(handler) {
                this.handlers.push(handler);
            }
            remove(handler) {
                this.handlers = this.handlers.filter(x => x != handler);
            }
            trigger(data) {
                this.handlers.slice(0).forEach(x => x(data));
            }
        }
        Utils.EventHandler = EventHandler;
        class ProxyEventHandler {
            constructor(addHandler, removeHandler) {
                this.addHandler = addHandler;
                this.removeHandler = removeHandler;
            }
            add(handler) {
                this.addHandler(handler);
            }
            remove(handler) {
                this.removeHandler(handler);
            }
        }
        Utils.ProxyEventHandler = ProxyEventHandler;
    })(Utils = Weclarative.Utils || (Weclarative.Utils = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Utils;
    (function (Utils) {
        class Promises {
            static delay(timeout) {
                const promise = new Promise((resolve) => {
                    window.setTimeout(() => resolve(), timeout);
                });
                return promise;
            }
        }
        Utils.Promises = Promises;
    })(Utils = Weclarative.Utils || (Weclarative.Utils = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Utils;
    (function (Utils) {
        class Reflection {
            static getParameterNames(func) {
                const funcAsString = func.toString().replace(Reflection.STRIP_COMMENTS, "");
                let matches = funcAsString.slice(funcAsString.indexOf("(") + 1, funcAsString.indexOf(")")).match(Reflection.ARGUMENT_NAMES);
                let result = new Array();
                if (matches != null) {
                    for (let i = 0; i < matches.length; i++) {
                        result.push(matches[i]);
                    }
                }
                return result;
            }
        }
        Reflection.STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg;
        Reflection.ARGUMENT_NAMES = /([^\s,]+)/g;
        Utils.Reflection = Reflection;
    })(Utils = Weclarative.Utils || (Weclarative.Utils = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Utils;
    (function (Utils) {
        class Strings {
            static chopStart(s, prefix) {
                if (s.startsWith(prefix))
                    s = s.substring(prefix.length);
                return s;
            }
            static chopEnd(s, suffix) {
                if (s.endsWith(suffix))
                    s = s.substring(0, s.length - suffix.length);
                return s;
            }
            static isNullOrEmpty(s) {
                return s == null || s == "";
            }
            static slugToCamelCase(s, slug = "_") {
                let result = "";
                let wasSlug = false;
                for (let i = 0; i < s.length; i++) {
                    const c = s[i];
                    if (c == slug) {
                        wasSlug = true;
                    }
                    else if (wasSlug) {
                        result += c.toUpperCase();
                        wasSlug = false;
                    }
                    else {
                        result += c;
                    }
                }
                return result;
            }
            static camelCaseToSlug(s, slug = "_") {
                let result = "";
                for (let i = 0; i < s.length; i++) {
                    const c = s[i];
                    if (Strings.isUpperCase(c)) {
                        result += slug;
                        result += c.toLowerCase();
                    }
                    else {
                        result += c;
                    }
                }
                return result;
            }
            static decapitalize(s) {
                return s[0].toLowerCase() + s.slice(1);
            }
            static capitalize(s) {
                return s[0].toUpperCase() + s.slice(1);
            }
            static isUpperCase(s) {
                for (let i = 0; i < s.length; i++) {
                    const c = s[i];
                    const cUpper = c.toUpperCase();
                    const cLower = c.toLowerCase();
                    const result = c == cUpper && cUpper != cLower;
                    if (!result)
                        return false;
                }
                return true;
            }
            static isLowerCase(s) {
                for (let i = 0; i < s.length; i++) {
                    const c = s[i];
                    const cUpper = c.toUpperCase();
                    const cLower = c.toLowerCase();
                    const result = c == cLower && cUpper != cLower;
                    if (!result)
                        return false;
                }
                return true;
            }
        }
        Utils.Strings = Strings;
    })(Utils = Weclarative.Utils || (Weclarative.Utils = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Routes;
    (function (Routes) {
        class RoutePart {
            constructor() {
                this._routeData = new Map();
            }
            get routeData() {
                return this._routeData;
            }
            processData(path, data) {
                this.consumePath(path);
                for (const key of this.routeData.keys()) {
                    data.setValue(key, this.routeData.get(key));
                }
            }
            consumePath(path) {
                path.consume();
            }
            construct(args) { throw new Error("Not implemented"); }
        }
        Routes.RoutePart = RoutePart;
    })(Routes = Weclarative.Routes || (Weclarative.Routes = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Routes;
    (function (Routes) {
        class RouteBuilder {
            constructor() {
                this.parts = Array();
                this.pinning = new Array();
            }
            pin() {
                this.pinning.push(this.parts.length);
                return new RouteBuilder.Pinned(this);
            }
            unpin() {
                const pin = this.pinning.pop();
                while (this.parts.length > pin) {
                    this.parts.splice(this.parts.length - 1, 1);
                }
            }
            toArray() {
                return this.parts.slice();
            }
            add(part) {
                this.parts.push(part);
            }
        }
        Routes.RouteBuilder = RouteBuilder;
        (function (RouteBuilder) {
            class Pinned {
                constructor(builder) {
                    this.builder = builder;
                }
                accept() {
                    this.accepted = true;
                }
                dispose() {
                    if (!this.accepted)
                        this.builder.unpin();
                }
            }
            RouteBuilder.Pinned = Pinned;
        })(RouteBuilder = Routes.RouteBuilder || (Routes.RouteBuilder = {}));
    })(Routes = Weclarative.Routes || (Weclarative.Routes = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Routes;
    (function (Routes) {
        class RouteData {
            constructor() {
                this.values = new Map();
            }
            getValue(key) {
                return this.values.get(key);
            }
            setValue(key, value) {
                this.values.set(key, value);
            }
            get action() {
                return this.getValue(RouteData.actionKey);
            }
            get controller() {
                return this.getValue(RouteData.controllerKey);
            }
        }
        RouteData.controllerKey = "@controller";
        RouteData.actionKey = "@action";
        Routes.RouteData = RouteData;
    })(Routes = Weclarative.Routes || (Weclarative.Routes = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Routes;
    (function (Routes) {
        class RouteDefault extends Routes.RoutePart {
            constructor() {
                super();
            }
            acceptPath(path) {
                // We only want to apply default routes if there's nothing left in the path
                return path.current == null;
            }
            consumePath(path) {
            }
            construct(args) {
                return "";
            }
            toString() {
                return `(default) ${super.toString()}`;
            }
        }
        Routes.RouteDefault = RouteDefault;
    })(Routes = Weclarative.Routes || (Weclarative.Routes = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Routes;
    (function (Routes) {
        var Convert = Weclarative.Utils.Convert;
        class RouteVariable extends Routes.RoutePart {
            constructor(isTerminal, parameter, parameterType) {
                super();
                this.isTerminal = isTerminal;
                this.parameter = parameter;
                this.parameterType = parameterType;
            }
            acceptPath(path) {
                if (path.current != null) {
                    path.consume();
                    return true;
                }
                return false;
            }
            consumePath(path) {
                // Prevent default consume since we're going to consume it ourselves below
            }
            processData(path, data) {
                super.processData(path, data);
                let part = path.consume();
                part = decodeURI(part);
                const value = Convert.to(part, this.parameterType);
                data.setValue(this.parameter, value);
            }
            construct(args) {
                const arg = args.shift();
                return arg.toString();
            }
            toString() {
                return `{${this.parameter}} ${super.toString()}`;
            }
        }
        Routes.RouteVariable = RouteVariable;
    })(Routes = Weclarative.Routes || (Weclarative.Routes = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Routes;
    (function (Routes) {
        var Strings = Weclarative.Utils.Strings;
        var Arrays = Weclarative.Utils.Arrays;
        class RouteEngine {
            constructor() {
                this.routeTree = new Routes.RouteTree();
            }
            registerController(controller) {
                const route = controller.path;
                const routePath = new Routes.RoutePath(route);
                let currentNode = this.routeTree;
                let parentNode = this.routeTree;
                do {
                    let nextNode = null;
                    if (routePath.current != null) {
                        const routePart = routePath.consume();
                        const part = new Routes.RouteLiteral(routePart, true);
                        nextNode = new Routes.RouteNode(currentNode, part);
                        this.addNode(currentNode, nextNode);
                        if (routePath.current == null) {
                            part.routeData.set(Routes.RouteData.controllerKey, controller);
                            parentNode = nextNode;
                        }
                    }
                    if (nextNode != null) {
                        currentNode = nextNode;
                    }
                } while (routePath.current != null);
                controller.registerRoutes((routes, action) => this.add(controller, parentNode, routes, action));
            }
            add(controller, parentNode, route, action, isDefault) {
                let addToRoot = false;
                if (route.startsWith("/")) {
                    addToRoot = true;
                }
                action.$route = route;
                action.$controller = controller;
                const routePath = new Routes.RoutePath(route);
                let currentNode = parentNode;
                do {
                    let nextNode = null;
                    if (routePath.current != null) {
                        const part = routePath.consume();
                        let routePart;
                        if (part.startsWith("{") && part.endsWith("}")) {
                            const pieces = Strings.chopEnd(Strings.chopStart(part, "{"), "}").trim().split(":");
                            const [name, type] = pieces;
                            const variable = new Routes.RouteVariable(routePath.current == null, name, type);
                            routePart = variable;
                        }
                        else {
                            routePart = new Routes.RouteLiteral(part, routePath.current == null);
                        }
                        nextNode = new Routes.RouteNode(currentNode, routePart);
                        if (routePath.current == null) {
                            routePart.routeData.set(Routes.RouteData.actionKey, action);
                            routePart.routeData.set(Routes.RouteData.controllerKey, controller);
                            action.$route = nextNode;
                        }
                        nextNode = this.addNode(currentNode, nextNode);
                    }
                    if (routePath.current == null && route == "") {
                        const defaultRoute = new Routes.RouteDefault();
                        defaultRoute.routeData.set(Routes.RouteData.actionKey, action);
                        defaultRoute.routeData.set(Routes.RouteData.controllerKey, controller);
                        const defaultNode = new Routes.RouteNode(currentNode, defaultRoute);
                        this.addNode(currentNode, defaultNode);
                    }
                    currentNode = nextNode;
                } while (routePath.current != null);
            }
            addNode(parent, child) {
                if (child.part instanceof Routes.RouteLiteral && !child.part.isTerminal) {
                    const routeLiteral = child.part;
                    const commonChild = Arrays.find(parent.children, x => x.part instanceof Routes.RouteLiteral && x.part.literal == routeLiteral.literal && !x.part.isTerminal);
                    if (commonChild != null)
                        return commonChild;
                }
                if (child.part instanceof Routes.RouteVariable) {
                    const routeVariable = child.part;
                    if (!routeVariable.isTerminal) {
                        const commonChild = Arrays.find(parent.children, x => x.part instanceof Routes.RouteVariable && !x.part.isTerminal);
                        if (commonChild != null)
                            return commonChild;
                    }
                }
                if (child.part instanceof Routes.RouteLiteral)
                    parent.children.unshift(child);
                else
                    parent.children.push(child);
                return child;
            }
            generateTree() {
                return this.routeTree;
            }
        }
        Routes.RouteEngine = RouteEngine;
    })(Routes = Weclarative.Routes || (Weclarative.Routes = {}));
})(Weclarative || (Weclarative = {}));
// <reference path="RoutePart.ts" />
var Weclarative;
(function (Weclarative) {
    var Routes;
    (function (Routes) {
        class RouteLiteral extends Routes.RoutePart {
            constructor(literal, isTerminal) {
                super();
                this.literal = literal;
                this.isTerminal = isTerminal;
                this.literal = literal.toLowerCase();
            }
            acceptPath(path) {
                if (path.current != null && path.current.toLowerCase() == this.literal) {
                    path.consume();
                    return true;
                }
                else {
                    return false;
                }
            }
            construct(args) {
                return this.literal;
            }
            toString() {
                return this.literal + " " + super.toString();
            }
        }
        Routes.RouteLiteral = RouteLiteral;
    })(Routes = Weclarative.Routes || (Weclarative.Routes = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Routes;
    (function (Routes) {
        class RouteNode {
            constructor(parent, part) {
                this.parent = parent;
                this.part = part;
                this.children = Array();
            }
            toString() {
                return this.part.toString();
            }
        }
        Routes.RouteNode = RouteNode;
    })(Routes = Weclarative.Routes || (Weclarative.Routes = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Routes;
    (function (Routes) {
        var Strings = Weclarative.Utils.Strings;
        var Arrays = Weclarative.Utils.Arrays;
        class RoutePath {
            constructor(path) {
                this._remaining = new Array();
                this.consumed = new Array();
                this.pinning = new Array();
                path = Strings.chopStart(path, "/");
                if (path != "") {
                    const parts = path.split("/");
                    parts.reverse();
                    for (const part of parts) {
                        this._remaining.push(part);
                    }
                }
            }
            pin() {
                this.pinning.push(this.location);
                return new RoutePath.Pinned(this);
            }
            unpin() {
                this.resetLocation(this.pinning.pop());
            }
            get location() {
                return this.consumed.length;
            }
            resetLocation(location) {
                if (location > this.consumed.length) {
                    throw new Error("Illegal location " + location + ", only " + this.consumed.length + " items in the back stack.");
                }
                while (this.consumed.length > location) {
                    this.back();
                }
            }
            any() {
                return this._remaining.length > 0;
            }
            get remaining() {
                return this._remaining.length;
            }
            startsWith(routePath) {
                if (routePath._remaining.length > this._remaining.length)
                    return false;
                if (Arrays.areEqual(this._remaining.slice(0, routePath._remaining.length), routePath._remaining))
                    return true;
                return false;
            }
            get current() {
                return this._remaining.length > 0 ? this._remaining[this._remaining.length - 1] : null;
            }
            consume() {
                const part = this._remaining.pop();
                this.consumed.push(part);
                return part;
            }
            consumeAll() {
                var s = "";
                while (this.any()) {
                    if (s.length > 0)
                        s += "/";
                    s += this.consume();
                }
                return s;
            }
            consumePath(path) {
                for (var i = 0; i < path._remaining.length; i++)
                    this.consume();
            }
            back() {
                var part = this.consumed.pop();
                this._remaining.push(part);
                return part;
            }
            reset() {
                while (this.consumed.length > 0) {
                    const part = this.consumed.pop();
                    this._remaining.push(part);
                }
            }
            toString() {
                var s = "";
                if (this.consumed.length > 0) {
                    s += this.consumed.slice().reverse().join("/");
                }
                if (this._remaining.length > 0) {
                    s += `/*${this._remaining[this._remaining.length - 1]}*`;
                    if (this._remaining.length > 1) {
                        s += "/";
                        let [, ...rest] = this._remaining;
                        s += rest.join("/");
                    }
                }
                return s;
            }
        }
        RoutePath.Pinned = class {
            constructor(path) {
                this.path = path;
            }
            dispose() {
                this.path.unpin();
            }
        }
        ;
        Routes.RoutePath = RoutePath;
    })(Routes = Weclarative.Routes || (Weclarative.Routes = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Routes;
    (function (Routes) {
        var Strings = Weclarative.Utils.Strings;
        var using = Weclarative.Utils.using;
        class RouteTree {
            constructor() {
                this.rootPaths = new Array();
            }
            get children() {
                return this.rootPaths;
            }
            construct(action, args) {
                const leaf = action.$route;
                const parts = new Array();
                let current = leaf;
                while (current != null) {
                    const part = current.part;
                    parts.unshift(part);
                    current = current.parent;
                }
                let result = "";
                for (const part of parts) {
                    const partPath = part.construct(args);
                    if (result.length > 0)
                        result += "/";
                    result += partPath;
                }
                return result;
            }
            apply(path) {
                path = Strings.chopEnd(path, "/");
                const route = this.findFirstRoute(path);
                if (route == null) {
                    throw new Error(`Could not apply the URL path '${path}'.  No route supports this path.`);
                }
                const routeData = new Routes.RouteData();
                const routePath = new Routes.RoutePath(path);
                for (const part of route) {
                    part.processData(routePath, routeData);
                }
                return routeData;
            }
            findFirstRoute(path) {
                const routePath = new Routes.RoutePath(path);
                const route = new Routes.RouteBuilder();
                for (const node of this.rootPaths) {
                    if (this.calculateRoute(routePath, route, node)) {
                        return route.toArray();
                    }
                }
                return null;
            }
            calculateRoute(path, route, node) {
                return using(path.pin(), _ => {
                    return using(route.pin(), pin => {
                        if (node.part.acceptPath(path)) {
                            route.add(node.part);
                            if (node.children.length > 0) {
                                for (const child of node.children) {
                                    if (this.calculateRoute(path, route, child)) {
                                        pin.accept();
                                        return true;
                                    }
                                }
                            }
                            else if (!path.any()) {
                                pin.accept();
                                return true;
                            }
                        }
                        return false;
                    });
                });
            }
            toString() {
                return "(root)";
            }
        }
        Routes.RouteTree = RouteTree;
    })(Routes = Weclarative.Routes || (Weclarative.Routes = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Views;
    (function (Views) {
        var EventHandler = Weclarative.Utils.EventHandler;
        class View {
            constructor() {
                this.attached = new EventHandler();
                this.detached = new EventHandler();
            }
            get sections() {
                if (this._sections == null)
                    this._sections = new Map();
                return this._sections;
            }
            get content() {
                return this._content;
            }
            set content(value) {
                const control = value;
                if (this._content != null)
                    this._content.onRemovedFromView();
                this._content = value;
                control.view = this;
                if (this.isInitialized)
                    control.onAddedToView();
            }
            get viewContext() {
                return this._viewContext;
            }
            notifyViewAttached() {
                this.onViewAttached();
            }
            notifyViewDetached() {
                this.onViewDetached();
            }
            onViewAttached() {
                this.attached.trigger();
            }
            onViewDetached() {
                this.detached.trigger();
            }
            getRootView() {
                this.verifyLayouts();
                if (this._layout != null)
                    return this._layout.getRootView();
                else
                    return this;
            }
            verifyLayouts() {
                if (this._layout == null && this.layoutType != null) {
                    this._layout = this.createLayout();
                    if (this._viewContext == null)
                        throw new Error("ControllerContext not set yet");
                    this._layout.initialize(this.viewContext);
                    this._layout.addView(this);
                }
            }
            createLayout() {
                return this.layoutType.factory();
            }
            initialize(context) {
                this.isInitialized = true;
                this._viewContext = context;
                this.onInitialize();
            }
            onInitialize() {
                if (this.content != null)
                    this.content.onAddedToView();
            }
            static generateUrl(action, invoker) {
                let args;
                if (invoker) {
                    function argumentExtractor() {
                        for (var i = 0; i < arguments.length; i++) {
                            args[i] = arguments[i];
                        }
                    }
                    invoker(argumentExtractor);
                }
                const controller = action.$controller;
                const route = action.$route;
                const controllerPath = controller.path;
                if (route.startsWith("/"))
                    return route;
                let result = "";
                if (controllerPath != "")
                    result += `/${controllerPath}`;
                if (route != "")
                    result += `/${route}`;
                return result;
            }
        }
        Views.View = View;
    })(Views = Weclarative.Views || (Weclarative.Views = {}));
})(Weclarative || (Weclarative = {}));
// <reference path="View.ts" />
var Weclarative;
(function (Weclarative) {
    var Views;
    (function (Views) {
        class Layout extends Views.View {
            constructor() {
                super();
                this.subviews = new Array();
            }
            addView(view) {
                this.onAddView(view);
                this.subviews.push(view);
                view.notifyViewAttached();
            }
            removeView(view) {
                this.subviews.splice(this.subviews.indexOf(view), 1);
                view.notifyViewDetached();
            }
            onAddView(view) {
            }
            findLayout(layoutType) {
                if (layoutType.type == this.layoutType.type)
                    return this;
                else
                    return null;
            }
            loadSections(sections) {
            }
        }
        Views.Layout = Layout;
    })(Views = Weclarative.Views || (Weclarative.Views = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        class MouseTrackingEngine {
            constructor() {
                window.addEventListener("mousemove", evt => this.onMouseMove(evt));
                window.addEventListener("mouseout", evt => this.onMouseOut(evt));
                window.addEventListener("mousedown", evt => this.onMouseDown(evt));
                window.addEventListener("mouseup", evt => this.onMouseUp(evt));
                window.addEventListener("wheel", evt => this.onWheel(evt));
            }
            onMouseMove(evt) {
                let currentElement = evt.target;
                if (this.lastElement != currentElement) {
                    let current = currentElement;
                    while (current != null) {
                        const hasMouse = current.$hasMouse;
                        if (!hasMouse)
                            this.fireMouseEntered(current);
                        else
                            break;
                        current = current.parentElement;
                    }
                    // If the new element is not contained in the last element...
                    if (this.lastElement != null && !this.lastElement.contains(currentElement)) {
                        let last = this.lastElement;
                        while (last != null) {
                            if (!last.contains(currentElement))
                                this.fireMouseExited(last);
                            else
                                break;
                            last = last.parentElement;
                        }
                    }
                    this.lastElement = currentElement;
                }
            }
            fireMouseEntered(element) {
                element.$hasMouse = true;
                const mouseEnterEvent = new CustomEvent("mouseentered");
                element.dispatchEvent(mouseEnterEvent);
            }
            fireMouseExited(element) {
                element.$hasMouse = false;
                const mouseExitedEvent = new CustomEvent("mouseexited");
                element.dispatchEvent(mouseExitedEvent);
            }
            fireMouseUp(element) {
                const mouseUpEvent = new CustomEvent("mouseup");
                element.dispatchEvent(mouseUpEvent);
            }
            onMouseOut(evt) {
                if (evt.relatedTarget == null) {
                    let current = this.lastElement;
                    while (current != null) {
                        this.fireMouseExited(current);
                        current = current.parentElement;
                    }
                }
            }
            onMouseDown(evt) {
                this._isMouseDown = true;
                this.mouseDownTarget = evt.target;
            }
            onMouseUp(evt) {
                this._isMouseDown = false;
                if (evt.target != this.mouseDownTarget)
                    this.fireMouseUp(this.mouseDownTarget);
            }
            onWheel(evt) {
                return __awaiter(this, void 0, void 0, function* () {
                    const atBottom = window.innerHeight + window.scrollY == document.body.scrollHeight;
                    if (this.wasAtBottom != atBottom) {
                        this.wasAtBottom = atBottom;
                        // This section resets the wasAtBottom state if the scroll bars aren't visible.  This is to allow further
                        // triggering after the delay.  Otherwise, once you've gotten the first wasAtBottom change to occur, it
                        // would never fire again.
                        if (this.wasAtBottom && window.scrollY == 0) {
                            yield Weclarative.Utils.Promises.delay(3000);
                            this.wasAtBottom = false;
                        }
                        if (this.wasAtBottom && Weclarative.MvcApplication.instance.view != null) {
                            Weclarative.MvcApplication.instance.notifyOnBottomBounced();
                        }
                    }
                });
            }
            get isMouseDown() {
                return this._isMouseDown;
            }
        }
        Controls.MouseTrackingEngine = MouseTrackingEngine;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        var EventHandler = Weclarative.Utils.EventHandler;
        class Control {
            constructor(tagName = "div", node = null) {
                this.tagName = tagName;
                this.children = new Array();
                if (node != null) {
                    this.node = node;
                    this._isAttachedToDom = true;
                }
                else {
                    this.node = this.createNode();
                }
            }
            get isAttachedToDom() {
                return this._isAttachedToDom;
            }
            getChild(index) {
                return this.children[index];
            }
            get style() {
                return this.node.style;
            }
            get attachedToDom() {
                if (this._attachedToDom == null)
                    this._attachedToDom = new EventHandler();
                return this._attachedToDom;
            }
            get detachedFromDom() {
                if (this._detachedFromDom == null)
                    this._detachedFromDom = new EventHandler();
                return this._detachedFromDom;
            }
            get node() {
                return this._node;
            }
            set node(value) {
                this._node = value;
                this.node.$control = this;
                this.node.setAttribute("data-class-name", this.constructor.name);
            }
            get view() {
                if (this._view != null)
                    return this._view;
                else if (this._parent != null)
                    return this._parent.view;
                else
                    throw new Error("View not found for control");
            }
            set view(value) {
                this._view = value;
            }
            get parent() {
                return this._parent;
            }
            get onClick() {
                if (this._onClick == null) {
                    this._onClick = new EventHandler();
                    this.node.addEventListener("click", (evt) => this.onJsClick(evt));
                }
                return this._onClick;
            }
            onJsClick(evt) {
                this._onClick.trigger(evt);
            }
            get onMouseEntered() {
                if (this._onMouseEntered == null) {
                    this._onMouseEntered = new EventHandler();
                    this.node.addEventListener("mouseentered", (evt) => this.onJsMouseEntered(evt));
                }
                return this._onMouseEntered;
            }
            onJsMouseEntered(evt) {
                this._onMouseEntered.trigger(evt);
            }
            get onMouseExited() {
                if (this._onMouseExited == null) {
                    this._onMouseExited = new EventHandler();
                    this.node.addEventListener("mouseexited", evt => this.onJsMouseExited(evt));
                }
                return this._onMouseExited;
            }
            onJsMouseExited(evt) {
                this._onMouseExited.trigger(evt);
            }
            get onMouseDown() {
                if (this._onMouseDown == null) {
                    this._onMouseDown = new EventHandler();
                    this.node.addEventListener("mousedown", evt => this.onJsMouseDown(evt));
                }
                return this._onMouseDown;
            }
            onJsMouseDown(evt) {
                this._onMouseDown.trigger(evt);
            }
            get onMouseUp() {
                if (this._onMouseUp == null) {
                    this._onMouseUp = new EventHandler();
                    this.node.addEventListener("mousedown", evt => this.onJsMouseUp(evt));
                }
                return this._onMouseUp;
            }
            onJsMouseUp(evt) {
                this.onMouseUp.trigger(evt);
            }
            get onWheel() {
                if (this._onWheel == null) {
                    this._onWheel = new EventHandler();
                    this.node.addEventListener("wheel", evt => this.onJsWheel(evt));
                }
                return this._onWheel;
            }
            onJsWheel(evt) {
                this.onWheel.trigger(evt);
            }
            onAddedToView() {
                for (let child of this.children) {
                    child._view = this.view;
                    child.onAddedToView();
                }
            }
            onRemovedFromView() {
                for (var child of this.children) {
                    child._view = null;
                    child.onRemovedFromView();
                }
            }
            createNode() {
                const node = document.createElement(this.tagName);
                return node;
            }
            addChild(child) {
                if (child.parent == this)
                    throw new Error("The speciifed child is already present in this container");
                this.children.push(child);
                child._parent = this;
                child.onAdded();
            }
            removeChild(child) {
                if (child.parent != this)
                    throw new Error("The specified child is not contained in this container");
                this.children.splice(this.children.indexOf(child), 1);
                child._parent = null;
                this.onRemove(child);
            }
            onRemove(child) {
                child.onRemoved();
            }
            removeAll() {
                while (this.count > 0)
                    this.removeChild(this.get(0));
            }
            get(index) {
                return this.children[index];
            }
            get count() {
                return this.children.length;
            }
            onAdded() {
                if (this.parent.isAttachedToDom)
                    this.onAttachedToDom();
            }
            onRemoved() {
                this.onDetachedFromDom();
            }
            onAttachedToDom() {
                if (!this.isAttachedToDom) {
                    this._isAttachedToDom = true;
                    if (this._attachedToDom != null)
                        this.attachedToDom.trigger();
                    for (let child of this.children) {
                        child.onAttachedToDom();
                    }
                }
            }
            onDetachedFromDom() {
                if (this.isAttachedToDom) {
                    this._isAttachedToDom = false;
                    if (this._detachedFromDom != null)
                        this.detachedFromDom.trigger();
                    for (let child of this.children) {
                        child.onDetachedFromDom();
                    }
                }
            }
            static get isMouseDown() {
                return Control.mouseTrackingEngine.isMouseDown;
            }
        }
        Control.mouseTrackingEngine = new Controls.MouseTrackingEngine();
        Controls.Control = Control;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        class AlignmentPanel extends Controls.Control {
            constructor(content, horizontalAlignment, verticalAlignment) {
                super();
                this.content = content;
                switch (horizontalAlignment) {
                    case Controls.HorizontalAlignment.Left:
                        this.cell.setAttribute("align", "left");
                        break;
                    case Controls.HorizontalAlignment.Center:
                        this.cell.setAttribute("align", "center");
                        break;
                    case Controls.HorizontalAlignment.Right:
                        this.cell.setAttribute("align", "right");
                        break;
                    case Controls.HorizontalAlignment.Fill:
                        this.cellDiv.style.width = "100%";
                        this.cell.style.width = "100%";
                        break;
                }
                switch (verticalAlignment) {
                    case Controls.VerticalAlignment.Top:
                        this.cell.style.verticalAlign = "top";
                        break;
                    case Controls.VerticalAlignment.Middle:
                        this.cell.style.verticalAlign = "middle";
                        break;
                    case Controls.VerticalAlignment.Bottom:
                        this.cell.style.verticalAlign = "bottom";
                        break;
                    case Controls.VerticalAlignment.Fill:
                        this.cell.style.height = "100%";
                        this.cellDiv.style.height = "100%";
                        break;
                }
            }
            static Top(content) {
                return new AlignmentPanel(content, Controls.HorizontalAlignment.Fill, Controls.VerticalAlignment.Top);
            }
            static Bottom(content) {
                return new AlignmentPanel(content, Controls.HorizontalAlignment.Fill, Controls.VerticalAlignment.Bottom);
            }
            static Right(content) {
                return new AlignmentPanel(content, Controls.HorizontalAlignment.Right, Controls.VerticalAlignment.Fill);
            }
            static Left(content) {
                return new AlignmentPanel(content, Controls.HorizontalAlignment.Left, Controls.VerticalAlignment.Fill);
            }
            static TopLeft(content) {
                return new AlignmentPanel(content, Controls.HorizontalAlignment.Left, Controls.VerticalAlignment.Top);
            }
            static TopRight(content) {
                return new AlignmentPanel(content, Controls.HorizontalAlignment.Right, Controls.VerticalAlignment.Top);
            }
            static BottomLeft(content) {
                return new AlignmentPanel(content, Controls.HorizontalAlignment.Left, Controls.VerticalAlignment.Bottom);
            }
            static BottomRight(content) {
                return new AlignmentPanel(content, Controls.HorizontalAlignment.Right, Controls.VerticalAlignment.Bottom);
            }
            static Center(content) {
                return new AlignmentPanel(content, Controls.HorizontalAlignment.Center, Controls.VerticalAlignment.Middle);
            }
            get content() {
                return this._content;
            }
            set content(value) {
                if (this.content != null) {
                    this.content.node.remove();
                    this.removeChild(this.content);
                }
                this._content = value;
                if (value != null) {
                    this.cellDiv.appendChild(value.node);
                    this.addChild(value);
                }
            }
            createNode() {
                this.cellDiv = document.createElement("div");
                this.cell = document.createElement("td");
                this.cell.style.width = "100%";
                this.cell.style.height = "100%";
                this.cell.appendChild(this.cellDiv);
                const row = document.createElement("tr");
                const table = document.createElement("table");
                table.style.width = "100%";
                table.style.height = "100%";
                row.appendChild(this.cell);
                table.appendChild(row);
                return table;
            }
        }
        Controls.AlignmentPanel = AlignmentPanel;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        class Button extends Controls.Control {
            constructor(text = "") {
                super("input");
                this.node.type = "button";
                this.text = text;
            }
            get text() {
                return this.node.getAttribute("value") || "";
            }
            set text(value) {
                this.node.setAttribute("value", value);
            }
        }
        Controls.Button = Button;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        class CenteredPanel extends Controls.Control {
            constructor(content) {
                super();
                this.content = content || null;
            }
            get content() {
                return this._content;
            }
            set content(value) {
                if (this.content != null) {
                    this.removeChild(this.content);
                    this.content.node.remove();
                }
                this._content = value;
                if (value != null) {
                    const childNode = value.node;
                    this.contentContainer.appendChild(childNode);
                    this.addChild(value);
                }
            }
            createNode() {
                const table = document.createElement("table");
                table.style.width = "100%";
                table.style.height = "100%";
                table.style.borderCollapse = "collapse";
                const row = document.createElement("tr");
                table.appendChild(row);
                const td = document.createElement("td");
                td.setAttribute("align", "center");
                td.style.verticalAlign = "middle";
                this.contentContainer = document.createElement("div");
                td.appendChild(this.contentContainer);
                row.appendChild(td);
                const outerDiv = document.createElement("div");
                outerDiv.style.width = "100%";
                outerDiv.style.height = "100%";
                outerDiv.appendChild(table);
                return outerDiv;
            }
        }
        Controls.CenteredPanel = CenteredPanel;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        var EventHandler = Weclarative.Utils.EventHandler;
        class CheckBox extends Controls.Control {
            constructor(text = "") {
                super();
                this.onChanged = new EventHandler();
                this.text = text;
            }
            get text() {
                return this.label.innerHTML;
            }
            set text(value) {
                this.label.innerHTML = value;
            }
            createNode() {
                this.label = document.createElement("span");
                const span = document.createElement("span");
                this.checkbox = document.createElement("input");
                this.checkbox.setAttribute("type", "checkbox");
                this.checkbox.addEventListener("change", this.onJsChanged);
                span.appendChild(this.checkbox);
                span.appendChild(this.label);
                return span;
            }
            onJsChanged(evt) {
                if (this.onChanged != null)
                    this.onChanged.trigger();
            }
            get isChecked() {
                return this.checkbox.hasAttribute("checked");
            }
            set isChecked(value) {
                if (value)
                    this.checkbox.setAttribute("checked", "checked");
                else
                    this.checkbox.removeAttribute("checked");
            }
        }
        Controls.CheckBox = CheckBox;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        /**
         * Renders the content by setting width/height at 100% so that it fills inside the parent element
         */
        class FillPanel extends Controls.Control {
            constructor(content) {
                super();
                if (content)
                    this.content = content;
            }
            createNode() {
                const container = super.createNode();
                container.style.width = "100%";
                container.style.height = "100%";
                return container;
            }
            get content() {
                return this._content;
            }
            set content(value) {
                if (this.content != null) {
                    this.removeChild(this.content);
                    this.content.node.remove();
                }
                this._content = value;
                if (value != null) {
                    const childNode = value.node;
                    childNode.style.width = "100%";
                    childNode.style.height = "100%";
                    this.node.appendChild(childNode);
                    this.addChild(value);
                }
            }
        }
        Controls.FillPanel = FillPanel;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        class FixedPanel extends Controls.Control {
            constructor(content, width, height) {
                super();
                this.style.width = width + "px";
                this.style.height = height + "px";
                this.content = content;
            }
            get content() {
                return this._content;
            }
            set content(value) {
                if (this._content != null) {
                    this.removeChild(this.content);
                    this.content.node.remove();
                }
                this._content = value;
                if (value != null) {
                    this.node.appendChild(value.node);
                    this.content.style.width = "100%";
                    this.content.style.height = "100%";
                    this.addChild(value);
                }
            }
        }
        Controls.FixedPanel = FixedPanel;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        (function (FloatPanelSide) {
            FloatPanelSide[FloatPanelSide["Left"] = 0] = "Left";
            FloatPanelSide[FloatPanelSide["Right"] = 1] = "Right";
        })(Controls.FloatPanelSide || (Controls.FloatPanelSide = {}));
        var FloatPanelSide = Controls.FloatPanelSide;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        class FloatPanel extends Controls.Control {
            constructor(content, side) {
                super("div");
                this.content = content || null;
                this.side = side;
            }
            static left(content) {
                return new FloatPanel(content || null, Controls.FloatPanelSide.Left);
            }
            static right(content) {
                return new FloatPanel(content || null, Controls.FloatPanelSide.Right);
            }
            get side() {
                return this.node.style.cssFloat == "left" ? Controls.FloatPanelSide.Left : Controls.FloatPanelSide.Right;
            }
            set side(value) {
                this.node.style.cssFloat = value == Controls.FloatPanelSide.Left ? "left" : "right";
            }
            get content() {
                return this._content;
            }
            set content(value) {
                if (this.content != null) {
                    this.content.node.remove();
                    this.removeChild(this.content);
                }
                this._content = value;
                if (value != null) {
                    this.addChild(value);
                    this.node.appendChild(value.node);
                }
            }
        }
        Controls.FloatPanel = FloatPanel;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        /**
         * This panel renders its children as a normal series of HTML elements.  If you wish to to
         * align images and other content to the left or right so that content flows around it,
         * you'll need to use this panel in conjunction with FloatPanel.
         */
        class FlowPanel extends Controls.Control {
            constructor() {
                super("div");
                this.node.style.textAlign = "left";
            }
            add(control) {
                this.node.appendChild(control.node);
                this.addChild(control);
            }
            remove(control) {
                this.removeChild(control);
                control.node.remove();
            }
            removeAll() {
                super.removeAll();
            }
        }
        Controls.FlowPanel = FlowPanel;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        (function (HorizontalAlignment) {
            HorizontalAlignment[HorizontalAlignment["Left"] = 0] = "Left";
            HorizontalAlignment[HorizontalAlignment["Center"] = 1] = "Center";
            HorizontalAlignment[HorizontalAlignment["Right"] = 2] = "Right";
            HorizontalAlignment[HorizontalAlignment["Fill"] = 3] = "Fill";
        })(Controls.HorizontalAlignment || (Controls.HorizontalAlignment = {}));
        var HorizontalAlignment = Controls.HorizontalAlignment;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        (function (VerticalAlignment) {
            VerticalAlignment[VerticalAlignment["Top"] = 0] = "Top";
            VerticalAlignment[VerticalAlignment["Middle"] = 1] = "Middle";
            VerticalAlignment[VerticalAlignment["Bottom"] = 2] = "Bottom";
            VerticalAlignment[VerticalAlignment["Fill"] = 3] = "Fill";
        })(Controls.VerticalAlignment || (Controls.VerticalAlignment = {}));
        var VerticalAlignment = Controls.VerticalAlignment;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        class HorizontalPanel extends Controls.Control {
            constructor(spacing = 0) {
                super();
                this.spacing = spacing;
                this.defaultAlignment = Controls.VerticalAlignment.Fill;
            }
            get horizontalAlignment() {
                if (this.firstSpacer == null && this.lastSpacer == null)
                    return Controls.HorizontalAlignment.Fill;
                else if (this.firstSpacer != null && this.lastSpacer != null)
                    return Controls.HorizontalAlignment.Center;
                else if (this.firstSpacer != null)
                    return Controls.HorizontalAlignment.Right;
                else if (this.lastSpacer != null)
                    return Controls.HorizontalAlignment.Left;
                else
                    throw new Error();
            }
            set horizontalAlignment(value) {
                if (this.firstSpacer != null) {
                    this.firstSpacer.remove();
                    this.firstSpacer = null;
                }
                if (this.lastSpacer != null) {
                    this.lastSpacer.remove();
                    this.lastSpacer = null;
                }
                switch (value) {
                    case Controls.HorizontalAlignment.Fill:
                        break;
                    case Controls.HorizontalAlignment.Center:
                        this.firstSpacer = document.createElement("td");
                        this.firstSpacer.style.width = "50%";
                        Weclarative.Utils.Elements.prepend(this.row, this.firstSpacer);
                        this.lastSpacer = document.createElement("td");
                        this.lastSpacer.style.width = "50%";
                        this.row.appendChild(this.lastSpacer);
                        break;
                    case Controls.HorizontalAlignment.Left:
                        this.lastSpacer = document.createElement("td");
                        this.lastSpacer.style.width = "50%";
                        this.row.appendChild(this.lastSpacer);
                        break;
                    case Controls.HorizontalAlignment.Right:
                        this.firstSpacer = document.createElement("td");
                        this.firstSpacer.style.width = "50%";
                        Weclarative.Utils.Elements.prepend(this.row, this.firstSpacer);
                        break;
                }
            }
            createNode() {
                const table = document.createElement("table");
                this.row = document.createElement("tr");
                table.appendChild(this.row);
                return table;
            }
            add(child, alignment, spaceBefore = 0) {
                this.addChild(child);
                const cell = document.createElement("td");
                const div = document.createElement("div");
                cell.appendChild(div);
                switch (alignment) {
                    case Controls.VerticalAlignment.Fill:
                        child.node.style.height = "100%";
                        div.style.height = "100%";
                        break;
                    case Controls.VerticalAlignment.Top:
                        cell.style.verticalAlign = "top";
                        break;
                    case Controls.VerticalAlignment.Middle:
                        cell.style.verticalAlign = "middle";
                        break;
                    case Controls.VerticalAlignment.Bottom:
                        cell.style.verticalAlign = "bottom";
                        break;
                }
                if (spaceBefore != 0) {
                    div.style.marginLeft = spaceBefore + "px";
                }
                div.appendChild(child.node);
                if (this.lastSpacer != null)
                    this.row.insertBefore(cell, this.lastSpacer);
                else
                    this.row.appendChild(cell);
            }
        }
        Controls.HorizontalPanel = HorizontalPanel;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        class HorizontalRule extends Controls.Control {
            constructor() {
                super("hr");
            }
            get size() {
                return this.node.hasAttribute("size") ? parseInt(this.node.getAttribute("size")) : 1;
            }
            set size(value) {
                this.node.setAttribute("size", value.toString());
            }
        }
        Controls.HorizontalRule = HorizontalRule;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        class Html extends Controls.Control {
            constructor(html) {
                super("span");
                this.node.innerHTML = html;
            }
        }
        Controls.Html = Html;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        class HtmlControl extends Controls.Control {
            constructor(node) {
                super(null, node);
            }
            add(child) {
                this.node.appendChild(child.node);
                this.addChild(child);
            }
            remove(child) {
                this.removeChild(child);
                child.node.remove();
            }
        }
        Controls.HtmlControl = HtmlControl;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        (function (IconType) {
            IconType[IconType["None"] = 0] = "None";
            // Web Application Icons
            IconType[IconType["Adjust"] = 1] = "Adjust";
            IconType[IconType["Anchor"] = 2] = "Anchor";
            IconType[IconType["Archive"] = 3] = "Archive";
            IconType[IconType["Arrows"] = 4] = "Arrows";
            IconType[IconType["ArrowsH"] = 5] = "ArrowsH";
            IconType[IconType["ArrowsV"] = 6] = "ArrowsV";
            IconType[IconType["Asterisk"] = 7] = "Asterisk";
            IconType[IconType["Ban"] = 8] = "Ban";
            IconType[IconType["BarChartO"] = 9] = "BarChartO";
            IconType[IconType["Barcode"] = 10] = "Barcode";
            IconType[IconType["Bars"] = 11] = "Bars";
            IconType[IconType["Beer"] = 12] = "Beer";
            IconType[IconType["Bell"] = 13] = "Bell";
            IconType[IconType["BellO"] = 14] = "BellO";
            IconType[IconType["Bolt"] = 15] = "Bolt";
            IconType[IconType["Book"] = 16] = "Book";
            IconType[IconType["Bookmark"] = 17] = "Bookmark";
            IconType[IconType["BookmarkO"] = 18] = "BookmarkO";
            IconType[IconType["Briefcase"] = 19] = "Briefcase";
            IconType[IconType["Bug"] = 20] = "Bug";
            IconType[IconType["BuildingO"] = 21] = "BuildingO";
            IconType[IconType["Bullhorn"] = 22] = "Bullhorn";
            IconType[IconType["Bullseye"] = 23] = "Bullseye";
            IconType[IconType["Calendar"] = 24] = "Calendar";
            IconType[IconType["CalendarO"] = 25] = "CalendarO";
            IconType[IconType["Camera"] = 26] = "Camera";
            IconType[IconType["CameraRetro"] = 27] = "CameraRetro";
            IconType[IconType["CaretSquareODown"] = 28] = "CaretSquareODown";
            IconType[IconType["CaretSquareOLeft"] = 29] = "CaretSquareOLeft";
            IconType[IconType["CaretSquareORight"] = 30] = "CaretSquareORight";
            IconType[IconType["CaretSquareOUp"] = 31] = "CaretSquareOUp";
            IconType[IconType["Certificate"] = 32] = "Certificate";
            IconType[IconType["Check"] = 33] = "Check";
            IconType[IconType["CheckCircle"] = 34] = "CheckCircle";
            IconType[IconType["CheckCircleO"] = 35] = "CheckCircleO";
            IconType[IconType["CheckSquare"] = 36] = "CheckSquare";
            IconType[IconType["CheckSquareO"] = 37] = "CheckSquareO";
            IconType[IconType["Circle"] = 38] = "Circle";
            IconType[IconType["CircleO"] = 39] = "CircleO";
            IconType[IconType["ClockO"] = 40] = "ClockO";
            IconType[IconType["Cloud"] = 41] = "Cloud";
            IconType[IconType["CloudDownload"] = 42] = "CloudDownload";
            IconType[IconType["CloudUpload"] = 43] = "CloudUpload";
            IconType[IconType["Code"] = 44] = "Code";
            IconType[IconType["CodeFork"] = 45] = "CodeFork";
            IconType[IconType["Coffee"] = 46] = "Coffee";
            IconType[IconType["Cog"] = 47] = "Cog";
            IconType[IconType["Cogs"] = 48] = "Cogs";
            IconType[IconType["Comment"] = 49] = "Comment";
            IconType[IconType["CommentO"] = 50] = "CommentO";
            IconType[IconType["Comments"] = 51] = "Comments";
            IconType[IconType["CommentsO"] = 52] = "CommentsO";
            IconType[IconType["Compass"] = 53] = "Compass";
            IconType[IconType["CreditCard"] = 54] = "CreditCard";
            IconType[IconType["Crop"] = 55] = "Crop";
            IconType[IconType["Crosshairs"] = 56] = "Crosshairs";
            IconType[IconType["Cutlery"] = 57] = "Cutlery";
            IconType[IconType["Dashboard"] = 58] = "Dashboard";
            IconType[IconType["Desktop"] = 59] = "Desktop";
            IconType[IconType["DotCircleO"] = 60] = "DotCircleO";
            IconType[IconType["Download"] = 61] = "Download";
            IconType[IconType["Edit"] = 62] = "Edit";
            IconType[IconType["EllipsisH"] = 63] = "EllipsisH";
            IconType[IconType["EllipsisV"] = 64] = "EllipsisV";
            IconType[IconType["Envelope"] = 65] = "Envelope";
            IconType[IconType["EnvelopeO"] = 66] = "EnvelopeO";
            IconType[IconType["Eraser"] = 67] = "Eraser";
            IconType[IconType["Exchange"] = 68] = "Exchange";
            IconType[IconType["Exclamation"] = 69] = "Exclamation";
            IconType[IconType["ExclamationCircle"] = 70] = "ExclamationCircle";
            IconType[IconType["ExclamationTriangle"] = 71] = "ExclamationTriangle";
            IconType[IconType["ExternalLink"] = 72] = "ExternalLink";
            IconType[IconType["ExternalLinkSquare"] = 73] = "ExternalLinkSquare";
            IconType[IconType["Eye"] = 74] = "Eye";
            IconType[IconType["EyeSlash"] = 75] = "EyeSlash";
            IconType[IconType["Female"] = 76] = "Female";
            IconType[IconType["FighterJet"] = 77] = "FighterJet";
            IconType[IconType["Film"] = 78] = "Film";
            IconType[IconType["Filter"] = 79] = "Filter";
            IconType[IconType["Fire"] = 80] = "Fire";
            IconType[IconType["FireExtinguisher"] = 81] = "FireExtinguisher";
            IconType[IconType["Flag"] = 82] = "Flag";
            IconType[IconType["FlagCheckered"] = 83] = "FlagCheckered";
            IconType[IconType["FlagO"] = 84] = "FlagO";
            IconType[IconType["Flash"] = 85] = "Flash";
            IconType[IconType["Flask"] = 86] = "Flask";
            IconType[IconType["Folder"] = 87] = "Folder";
            IconType[IconType["FolderO"] = 88] = "FolderO";
            IconType[IconType["FolderOpen"] = 89] = "FolderOpen";
            IconType[IconType["FolderOpenO"] = 90] = "FolderOpenO";
            IconType[IconType["FrownO"] = 91] = "FrownO";
            IconType[IconType["Gamepad"] = 92] = "Gamepad";
            IconType[IconType["Gavel"] = 93] = "Gavel";
            IconType[IconType["Gear"] = 94] = "Gear";
            IconType[IconType["Gears"] = 95] = "Gears";
            IconType[IconType["Gift"] = 96] = "Gift";
            IconType[IconType["Glass"] = 97] = "Glass";
            IconType[IconType["Globe"] = 98] = "Globe";
            IconType[IconType["Group"] = 99] = "Group";
            IconType[IconType["HddO"] = 100] = "HddO";
            IconType[IconType["Headphones"] = 101] = "Headphones";
            IconType[IconType["Heart"] = 102] = "Heart";
            IconType[IconType["HeartO"] = 103] = "HeartO";
            IconType[IconType["Home"] = 104] = "Home";
            IconType[IconType["Inbox"] = 105] = "Inbox";
            IconType[IconType["Info"] = 106] = "Info";
            IconType[IconType["InfoCircle"] = 107] = "InfoCircle";
            IconType[IconType["Key"] = 108] = "Key";
            IconType[IconType["KeyboardO"] = 109] = "KeyboardO";
            IconType[IconType["Laptop"] = 110] = "Laptop";
            IconType[IconType["Leaf"] = 111] = "Leaf";
            IconType[IconType["Legal"] = 112] = "Legal";
            IconType[IconType["LemonO"] = 113] = "LemonO";
            IconType[IconType["LevelDown"] = 114] = "LevelDown";
            IconType[IconType["LevelUp"] = 115] = "LevelUp";
            IconType[IconType["LightbulbO"] = 116] = "LightbulbO";
            IconType[IconType["LocationArrow"] = 117] = "LocationArrow";
            IconType[IconType["Lock"] = 118] = "Lock";
            IconType[IconType["Magic"] = 119] = "Magic";
            IconType[IconType["Magnet"] = 120] = "Magnet";
            IconType[IconType["MailForward"] = 121] = "MailForward";
            IconType[IconType["MailReply"] = 122] = "MailReply";
            IconType[IconType["MailReplyAll"] = 123] = "MailReplyAll";
            IconType[IconType["Male"] = 124] = "Male";
            IconType[IconType["MapMarker"] = 125] = "MapMarker";
            IconType[IconType["MehO"] = 126] = "MehO";
            IconType[IconType["Microphone"] = 127] = "Microphone";
            IconType[IconType["MicrophoneSlash"] = 128] = "MicrophoneSlash";
            IconType[IconType["Minus"] = 129] = "Minus";
            IconType[IconType["MinusCircle"] = 130] = "MinusCircle";
            IconType[IconType["MinusSquare"] = 131] = "MinusSquare";
            IconType[IconType["MinusSquareO"] = 132] = "MinusSquareO";
            IconType[IconType["Mobile"] = 133] = "Mobile";
            IconType[IconType["MobilePhone"] = 134] = "MobilePhone";
            IconType[IconType["Money"] = 135] = "Money";
            IconType[IconType["MoonO"] = 136] = "MoonO";
            IconType[IconType["Music"] = 137] = "Music";
            IconType[IconType["Pencil"] = 138] = "Pencil";
            IconType[IconType["PencilSquare"] = 139] = "PencilSquare";
            IconType[IconType["PencilSquareO"] = 140] = "PencilSquareO";
            IconType[IconType["Phone"] = 141] = "Phone";
            IconType[IconType["PhoneSquare"] = 142] = "PhoneSquare";
            IconType[IconType["PictureO"] = 143] = "PictureO";
            IconType[IconType["Plane"] = 144] = "Plane";
            IconType[IconType["Plus"] = 145] = "Plus";
            IconType[IconType["PlusCircle"] = 146] = "PlusCircle";
            IconType[IconType["PlusSquare"] = 147] = "PlusSquare";
            IconType[IconType["PlusSquareO"] = 148] = "PlusSquareO";
            IconType[IconType["PowerOff"] = 149] = "PowerOff";
            IconType[IconType["Print"] = 150] = "Print";
            IconType[IconType["PuzzlePiece"] = 151] = "PuzzlePiece";
            IconType[IconType["Qrcode"] = 152] = "Qrcode";
            IconType[IconType["Question"] = 153] = "Question";
            IconType[IconType["QuestionCircle"] = 154] = "QuestionCircle";
            IconType[IconType["QuoteLeft"] = 155] = "QuoteLeft";
            IconType[IconType["QuoteRight"] = 156] = "QuoteRight";
            IconType[IconType["Random"] = 157] = "Random";
            IconType[IconType["Refresh"] = 158] = "Refresh";
            IconType[IconType["Remove"] = 159] = "Remove";
            IconType[IconType["Reply"] = 160] = "Reply";
            IconType[IconType["ReplyAll"] = 161] = "ReplyAll";
            IconType[IconType["Retweet"] = 162] = "Retweet";
            IconType[IconType["Road"] = 163] = "Road";
            IconType[IconType["Rocket"] = 164] = "Rocket";
            IconType[IconType["Rss"] = 165] = "Rss";
            IconType[IconType["RssSquare"] = 166] = "RssSquare";
            IconType[IconType["Search"] = 167] = "Search";
            IconType[IconType["SearchMinus"] = 168] = "SearchMinus";
            IconType[IconType["SearchPlus"] = 169] = "SearchPlus";
            IconType[IconType["Share"] = 170] = "Share";
            IconType[IconType["ShareSquare"] = 171] = "ShareSquare";
            IconType[IconType["ShareSquareO"] = 172] = "ShareSquareO";
            IconType[IconType["Shield"] = 173] = "Shield";
            IconType[IconType["ShoppingCart"] = 174] = "ShoppingCart";
            IconType[IconType["SignIn"] = 175] = "SignIn";
            IconType[IconType["SignOut"] = 176] = "SignOut";
            IconType[IconType["Signal"] = 177] = "Signal";
            IconType[IconType["Sitemap"] = 178] = "Sitemap";
            IconType[IconType["SmileO"] = 179] = "SmileO";
            IconType[IconType["Sort"] = 180] = "Sort";
            IconType[IconType["SortAlphaAsc"] = 181] = "SortAlphaAsc";
            IconType[IconType["SortAlphaDesc"] = 182] = "SortAlphaDesc";
            IconType[IconType["SortAmountAsc"] = 183] = "SortAmountAsc";
            IconType[IconType["SortAmountDesc"] = 184] = "SortAmountDesc";
            IconType[IconType["SortAsc"] = 185] = "SortAsc";
            IconType[IconType["SortDesc"] = 186] = "SortDesc";
            IconType[IconType["SortDown"] = 187] = "SortDown";
            IconType[IconType["SortNumericAsc"] = 188] = "SortNumericAsc";
            IconType[IconType["SortNumericDesc"] = 189] = "SortNumericDesc";
            IconType[IconType["SortUp"] = 190] = "SortUp";
            IconType[IconType["Spinner"] = 191] = "Spinner";
            IconType[IconType["Square"] = 192] = "Square";
            IconType[IconType["SquareO"] = 193] = "SquareO";
            IconType[IconType["Star"] = 194] = "Star";
            IconType[IconType["StarHalf"] = 195] = "StarHalf";
            IconType[IconType["StarHalfEmpty"] = 196] = "StarHalfEmpty";
            IconType[IconType["StarHalfFull"] = 197] = "StarHalfFull";
            IconType[IconType["StarHalfO"] = 198] = "StarHalfO";
            IconType[IconType["StarO"] = 199] = "StarO";
            IconType[IconType["Subscript"] = 200] = "Subscript";
            IconType[IconType["Suitcase"] = 201] = "Suitcase";
            IconType[IconType["SunO"] = 202] = "SunO";
            IconType[IconType["Superscript"] = 203] = "Superscript";
            IconType[IconType["Tablet"] = 204] = "Tablet";
            IconType[IconType["Tachometer"] = 205] = "Tachometer";
            IconType[IconType["Tag"] = 206] = "Tag";
            IconType[IconType["Tags"] = 207] = "Tags";
            IconType[IconType["Tasks"] = 208] = "Tasks";
            IconType[IconType["Terminal"] = 209] = "Terminal";
            IconType[IconType["ThumbTack"] = 210] = "ThumbTack";
            IconType[IconType["ThumbsDown"] = 211] = "ThumbsDown";
            IconType[IconType["ThumbsODown"] = 212] = "ThumbsODown";
            IconType[IconType["ThumbsOUp"] = 213] = "ThumbsOUp";
            IconType[IconType["ThumbsUp"] = 214] = "ThumbsUp";
            IconType[IconType["Ticket"] = 215] = "Ticket";
            IconType[IconType["Times"] = 216] = "Times";
            IconType[IconType["TimesCircle"] = 217] = "TimesCircle";
            IconType[IconType["TimesCircleO"] = 218] = "TimesCircleO";
            IconType[IconType["Tint"] = 219] = "Tint";
            IconType[IconType["ToggleDown"] = 220] = "ToggleDown";
            IconType[IconType["ToggleLeft"] = 221] = "ToggleLeft";
            IconType[IconType["ToggleRight"] = 222] = "ToggleRight";
            IconType[IconType["ToggleUp"] = 223] = "ToggleUp";
            IconType[IconType["TrashO"] = 224] = "TrashO";
            IconType[IconType["Trophy"] = 225] = "Trophy";
            IconType[IconType["Truck"] = 226] = "Truck";
            IconType[IconType["Umbrella"] = 227] = "Umbrella";
            IconType[IconType["Unlock"] = 228] = "Unlock";
            IconType[IconType["UnlockAlt"] = 229] = "UnlockAlt";
            IconType[IconType["Unsorted"] = 230] = "Unsorted";
            IconType[IconType["Upload"] = 231] = "Upload";
            IconType[IconType["User"] = 232] = "User";
            IconType[IconType["Users"] = 233] = "Users";
            IconType[IconType["VideoCamera"] = 234] = "VideoCamera";
            IconType[IconType["VolumeDown"] = 235] = "VolumeDown";
            IconType[IconType["VolumeOff"] = 236] = "VolumeOff";
            IconType[IconType["VolumeUp"] = 237] = "VolumeUp";
            IconType[IconType["Warning"] = 238] = "Warning";
            IconType[IconType["Wheelchair"] = 239] = "Wheelchair";
            IconType[IconType["Wrench"] = 240] = "Wrench";
            // File type icons
            IconType[IconType["File"] = 241] = "File";
            IconType[IconType["FileArchiveO"] = 242] = "FileArchiveO";
            IconType[IconType["FileAudioO"] = 243] = "FileAudioO";
            IconType[IconType["FileCodeO"] = 244] = "FileCodeO";
            IconType[IconType["FileExcelO"] = 245] = "FileExcelO";
            IconType[IconType["FileImageO"] = 246] = "FileImageO";
            IconType[IconType["FileMovieO"] = 247] = "FileMovieO";
            IconType[IconType["FileO"] = 248] = "FileO";
            IconType[IconType["FilePdfO"] = 249] = "FilePdfO";
            IconType[IconType["FilePhotoO"] = 250] = "FilePhotoO";
            IconType[IconType["FilePictureO"] = 251] = "FilePictureO";
            IconType[IconType["FilePowerpointO"] = 252] = "FilePowerpointO";
            IconType[IconType["FileSoundO"] = 253] = "FileSoundO";
            IconType[IconType["FileText"] = 254] = "FileText";
            IconType[IconType["FileTextO"] = 255] = "FileTextO";
            IconType[IconType["FileVideoO"] = 256] = "FileVideoO";
            IconType[IconType["FileWordO"] = 257] = "FileWordO";
            IconType[IconType["FileZipO"] = 258] = "FileZipO";
            // Spinner icons
            IconType[IconType["CircleONotch"] = 259] = "CircleONotch";
            // Currency icons
            IconType[IconType["Bitcoin"] = 260] = "Bitcoin";
            IconType[IconType["Btc"] = 261] = "Btc";
            IconType[IconType["Cny"] = 262] = "Cny";
            IconType[IconType["Dollar"] = 263] = "Dollar";
            IconType[IconType["Eur"] = 264] = "Eur";
            IconType[IconType["Euro"] = 265] = "Euro";
            IconType[IconType["Gbp"] = 266] = "Gbp";
            IconType[IconType["Inr"] = 267] = "Inr";
            IconType[IconType["Jpy"] = 268] = "Jpy";
            IconType[IconType["Krw"] = 269] = "Krw";
            IconType[IconType["Rmb"] = 270] = "Rmb";
            IconType[IconType["Rouble"] = 271] = "Rouble";
            IconType[IconType["Rub"] = 272] = "Rub";
            IconType[IconType["Ruble"] = 273] = "Ruble";
            IconType[IconType["Rupee"] = 274] = "Rupee";
            IconType[IconType["Try"] = 275] = "Try";
            IconType[IconType["TurkishLira"] = 276] = "TurkishLira";
            IconType[IconType["Usd"] = 277] = "Usd";
            IconType[IconType["Won"] = 278] = "Won";
            IconType[IconType["Yen"] = 279] = "Yen";
            // Text editor icons
            IconType[IconType["AlignCenter"] = 280] = "AlignCenter";
            IconType[IconType["AlignJustify"] = 281] = "AlignJustify";
            IconType[IconType["AlignLeft"] = 282] = "AlignLeft";
            IconType[IconType["AlignRight"] = 283] = "AlignRight";
            IconType[IconType["Bold"] = 284] = "Bold";
            IconType[IconType["Chain"] = 285] = "Chain";
            IconType[IconType["ChainBroken"] = 286] = "ChainBroken";
            IconType[IconType["Clipboard"] = 287] = "Clipboard";
            IconType[IconType["Columns"] = 288] = "Columns";
            IconType[IconType["Copy"] = 289] = "Copy";
            IconType[IconType["Cut"] = 290] = "Cut";
            IconType[IconType["Dedent"] = 291] = "Dedent";
            IconType[IconType["FilesO"] = 292] = "FilesO";
            IconType[IconType["FloppyO"] = 293] = "FloppyO";
            IconType[IconType["Font"] = 294] = "Font";
            IconType[IconType["Header"] = 295] = "Header";
            IconType[IconType["Indent"] = 296] = "Indent";
            IconType[IconType["Italic"] = 297] = "Italic";
            IconType[IconType["Link"] = 298] = "Link";
            IconType[IconType["List"] = 299] = "List";
            IconType[IconType["ListAlt"] = 300] = "ListAlt";
            IconType[IconType["ListOl"] = 301] = "ListOl";
            IconType[IconType["ListUl"] = 302] = "ListUl";
            IconType[IconType["Outdent"] = 303] = "Outdent";
            IconType[IconType["Paperclip"] = 304] = "Paperclip";
            IconType[IconType["Paragraph"] = 305] = "Paragraph";
            IconType[IconType["Paste"] = 306] = "Paste";
            IconType[IconType["Repeat"] = 307] = "Repeat";
            IconType[IconType["RotateLeft"] = 308] = "RotateLeft";
            IconType[IconType["RotateRight"] = 309] = "RotateRight";
            IconType[IconType["Save"] = 310] = "Save";
            IconType[IconType["Scissors"] = 311] = "Scissors";
            IconType[IconType["Strikethrough"] = 312] = "Strikethrough";
            IconType[IconType["Table"] = 313] = "Table";
            IconType[IconType["TextHeight"] = 314] = "TextHeight";
            IconType[IconType["TextWidth"] = 315] = "TextWidth";
            IconType[IconType["Th"] = 316] = "Th";
            IconType[IconType["ThLarge"] = 317] = "ThLarge";
            IconType[IconType["ThList"] = 318] = "ThList";
            IconType[IconType["Underline"] = 319] = "Underline";
            IconType[IconType["Undo"] = 320] = "Undo";
            IconType[IconType["Unlink"] = 321] = "Unlink";
            // Directional icons
            IconType[IconType["AngleDoubleDown"] = 322] = "AngleDoubleDown";
            IconType[IconType["AngleDoubleLeft"] = 323] = "AngleDoubleLeft";
            IconType[IconType["AngleDoubleRight"] = 324] = "AngleDoubleRight";
            IconType[IconType["AngleDoubleUp"] = 325] = "AngleDoubleUp";
            IconType[IconType["AngleDown"] = 326] = "AngleDown";
            IconType[IconType["AngleLeft"] = 327] = "AngleLeft";
            IconType[IconType["AngleRight"] = 328] = "AngleRight";
            IconType[IconType["AngleUp"] = 329] = "AngleUp";
            IconType[IconType["ArrowCircleDown"] = 330] = "ArrowCircleDown";
            IconType[IconType["ArrowCircleLeft"] = 331] = "ArrowCircleLeft";
            IconType[IconType["ArrowCircleODown"] = 332] = "ArrowCircleODown";
            IconType[IconType["ArrowCircleOLeft"] = 333] = "ArrowCircleOLeft";
            IconType[IconType["ArrowCircleORight"] = 334] = "ArrowCircleORight";
            IconType[IconType["ArrowCircleOUp"] = 335] = "ArrowCircleOUp";
            IconType[IconType["ArrowCircleRight"] = 336] = "ArrowCircleRight";
            IconType[IconType["ArrowCircleUp"] = 337] = "ArrowCircleUp";
            IconType[IconType["ArrowDown"] = 338] = "ArrowDown";
            IconType[IconType["ArrowLeft"] = 339] = "ArrowLeft";
            IconType[IconType["ArrowRight"] = 340] = "ArrowRight";
            IconType[IconType["ArrowUp"] = 341] = "ArrowUp";
            IconType[IconType["ArrowsAlt"] = 342] = "ArrowsAlt";
            IconType[IconType["CaretDown"] = 343] = "CaretDown";
            IconType[IconType["CaretLeft"] = 344] = "CaretLeft";
            IconType[IconType["CaretRight"] = 345] = "CaretRight";
            IconType[IconType["CaretUp"] = 346] = "CaretUp";
            IconType[IconType["ChevronCircleDown"] = 347] = "ChevronCircleDown";
            IconType[IconType["ChevronCircleLeft"] = 348] = "ChevronCircleLeft";
            IconType[IconType["ChevronCircleUp"] = 349] = "ChevronCircleUp";
            IconType[IconType["ChevronCircleRight"] = 350] = "ChevronCircleRight";
            IconType[IconType["ChevronDown"] = 351] = "ChevronDown";
            IconType[IconType["ChevronLeft"] = 352] = "ChevronLeft";
            IconType[IconType["ChevronRight"] = 353] = "ChevronRight";
            IconType[IconType["ChevronUp"] = 354] = "ChevronUp";
            IconType[IconType["HandODown"] = 355] = "HandODown";
            IconType[IconType["HandOLeft"] = 356] = "HandOLeft";
            IconType[IconType["HandORight"] = 357] = "HandORight";
            IconType[IconType["HandOUp"] = 358] = "HandOUp";
            IconType[IconType["LongArrowDown"] = 359] = "LongArrowDown";
            IconType[IconType["LongArrowLeft"] = 360] = "LongArrowLeft";
            IconType[IconType["LongArrowRight"] = 361] = "LongArrowRight";
            IconType[IconType["LongArrowUp"] = 362] = "LongArrowUp";
            // Video player icons
            IconType[IconType["Backward"] = 363] = "Backward";
            IconType[IconType["Compress"] = 364] = "Compress";
            IconType[IconType["Eject"] = 365] = "Eject";
            IconType[IconType["Expand"] = 366] = "Expand";
            IconType[IconType["FastBackward"] = 367] = "FastBackward";
            IconType[IconType["FastForward"] = 368] = "FastForward";
            IconType[IconType["Forward"] = 369] = "Forward";
            IconType[IconType["Pause"] = 370] = "Pause";
            IconType[IconType["Play"] = 371] = "Play";
            IconType[IconType["PlayCircle"] = 372] = "PlayCircle";
            IconType[IconType["PlayCircleO"] = 373] = "PlayCircleO";
            IconType[IconType["StepBackward"] = 374] = "StepBackward";
            IconType[IconType["StepForward"] = 375] = "StepForward";
            IconType[IconType["Stop"] = 376] = "Stop";
            IconType[IconType["YoutubePlay"] = 377] = "YoutubePlay";
            // Brand icons
            IconType[IconType["Adn"] = 378] = "Adn";
            IconType[IconType["Android"] = 379] = "Android";
            IconType[IconType["Apple"] = 380] = "Apple";
            IconType[IconType["Behance"] = 381] = "Behance";
            IconType[IconType["BehanceSquare"] = 382] = "BehanceSquare";
            IconType[IconType["Bitbucket"] = 383] = "Bitbucket";
            IconType[IconType["BitbucketSquare"] = 384] = "BitbucketSquare";
            IconType[IconType["Codepen"] = 385] = "Codepen";
            IconType[IconType["Css3"] = 386] = "Css3";
            IconType[IconType["Delicious"] = 387] = "Delicious";
            IconType[IconType["Deviantart"] = 388] = "Deviantart";
            IconType[IconType["Digg"] = 389] = "Digg";
            IconType[IconType["Dribbble"] = 390] = "Dribbble";
            IconType[IconType["Dropbox"] = 391] = "Dropbox";
            IconType[IconType["Drupal"] = 392] = "Drupal";
            IconType[IconType["Empire"] = 393] = "Empire";
            IconType[IconType["Facebook"] = 394] = "Facebook";
            IconType[IconType["FacebookSquare"] = 395] = "FacebookSquare";
            IconType[IconType["Flickr"] = 396] = "Flickr";
            IconType[IconType["Foursquare"] = 397] = "Foursquare";
            IconType[IconType["Ge"] = 398] = "Ge";
            IconType[IconType["Git"] = 399] = "Git";
            IconType[IconType["GitSquare"] = 400] = "GitSquare";
            IconType[IconType["Github"] = 401] = "Github";
            IconType[IconType["GithubAlt"] = 402] = "GithubAlt";
            IconType[IconType["GithubSquare"] = 403] = "GithubSquare";
            IconType[IconType["Gittip"] = 404] = "Gittip";
            IconType[IconType["Google"] = 405] = "Google";
            IconType[IconType["GooglePlus"] = 406] = "GooglePlus";
            IconType[IconType["GooglePlusSquare"] = 407] = "GooglePlusSquare";
            IconType[IconType["HackerNews"] = 408] = "HackerNews";
            IconType[IconType["Html5"] = 409] = "Html5";
            IconType[IconType["Instagram"] = 410] = "Instagram";
            IconType[IconType["Joomla"] = 411] = "Joomla";
            IconType[IconType["Jsfiddle"] = 412] = "Jsfiddle";
            IconType[IconType["Linkedin"] = 413] = "Linkedin";
            IconType[IconType["LinkedinSquare"] = 414] = "LinkedinSquare";
            IconType[IconType["Linux"] = 415] = "Linux";
            IconType[IconType["Maxcdn"] = 416] = "Maxcdn";
            IconType[IconType["Openid"] = 417] = "Openid";
            IconType[IconType["Pagelines"] = 418] = "Pagelines";
            IconType[IconType["PiedPiper"] = 419] = "PiedPiper";
            IconType[IconType["PiedPiperAlt"] = 420] = "PiedPiperAlt";
            IconType[IconType["PiedPiperSquare"] = 421] = "PiedPiperSquare";
            IconType[IconType["Pinterest"] = 422] = "Pinterest";
            IconType[IconType["PinterestSquare"] = 423] = "PinterestSquare";
            IconType[IconType["Qq"] = 424] = "Qq";
            IconType[IconType["Ra"] = 425] = "Ra";
            IconType[IconType["Rebel"] = 426] = "Rebel";
            IconType[IconType["Reddit"] = 427] = "Reddit";
            IconType[IconType["RedditSquare"] = 428] = "RedditSquare";
            IconType[IconType["Renren"] = 429] = "Renren";
            IconType[IconType["ShareAlt"] = 430] = "ShareAlt";
            IconType[IconType["ShareAltSquare"] = 431] = "ShareAltSquare";
            IconType[IconType["Skype"] = 432] = "Skype";
            IconType[IconType["Slack"] = 433] = "Slack";
            IconType[IconType["Soundcloud"] = 434] = "Soundcloud";
            IconType[IconType["Spotify"] = 435] = "Spotify";
            IconType[IconType["StackExchange"] = 436] = "StackExchange";
            IconType[IconType["StackOverflow"] = 437] = "StackOverflow";
            IconType[IconType["Steam"] = 438] = "Steam";
            IconType[IconType["SteamSquare"] = 439] = "SteamSquare";
            IconType[IconType["Stubleupon"] = 440] = "Stubleupon";
            IconType[IconType["StumbleuponCircle"] = 441] = "StumbleuponCircle";
            IconType[IconType["TencentWeibo"] = 442] = "TencentWeibo";
            IconType[IconType["Trello"] = 443] = "Trello";
            IconType[IconType["Tumblr"] = 444] = "Tumblr";
            IconType[IconType["TumblrSquare"] = 445] = "TumblrSquare";
            IconType[IconType["Twitter"] = 446] = "Twitter";
            IconType[IconType["TwitterSquare"] = 447] = "TwitterSquare";
            IconType[IconType["VimeoSquare"] = 448] = "VimeoSquare";
            IconType[IconType["Vine"] = 449] = "Vine";
            IconType[IconType["Vk"] = 450] = "Vk";
            IconType[IconType["Wechat"] = 451] = "Wechat";
            IconType[IconType["Weibo"] = 452] = "Weibo";
            IconType[IconType["Weixin"] = 453] = "Weixin";
            IconType[IconType["Windows"] = 454] = "Windows";
            IconType[IconType["Wordpress"] = 455] = "Wordpress";
            IconType[IconType["Xing"] = 456] = "Xing";
            IconType[IconType["XingSquare"] = 457] = "XingSquare";
            IconType[IconType["Yahoo"] = 458] = "Yahoo";
            IconType[IconType["Youtube"] = 459] = "Youtube";
            IconType[IconType["YoutubeSquare"] = 460] = "YoutubeSquare";
            // Medical icons
            IconType[IconType["Ambulance"] = 461] = "Ambulance";
            IconType[IconType["HSquare"] = 462] = "HSquare";
            IconType[IconType["HospitalO"] = 463] = "HospitalO";
            IconType[IconType["Medkit"] = 464] = "Medkit";
            IconType[IconType["Stethescope"] = 465] = "Stethescope";
            IconType[IconType["UserMd"] = 466] = "UserMd";
        })(Controls.IconType || (Controls.IconType = {}));
        var IconType = Controls.IconType;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        var Arrays = Weclarative.Utils.Arrays;
        var Strings = Weclarative.Utils.Strings;
        class Icon extends Controls.Control {
            constructor(source) {
                super("i");
                this.source = source;
            }
            get isSpinning() {
                return this.node.className.split(" ").indexOf("fa-spin") != -1;
            }
            set isSpinning(value) {
                const classes = this.node.className.split(" ");
                const hasSpin = classes.indexOf("fa-spin") != -1;
                if (value) {
                    if (!hasSpin)
                        this.node.className += " " + "fa-spin";
                }
                else {
                    if (hasSpin) {
                        Arrays.remove(classes, "fa-spin");
                        this.node.className = classes.join(" ");
                    }
                }
            }
            get source() {
                if (this.node.className == null)
                    return Controls.IconType.None;
                const parts = this.node.className.split(" ");
                Arrays.remove(parts, "fa");
                if (parts.length > 1)
                    return Controls.IconType.None;
                const part = parts[0];
                const slug = Strings.slugToCamelCase(part);
                return Controls.IconType[slug];
            }
            set source(value) {
                const slug = Strings.camelCaseToSlug(Strings.decapitalize(Controls.IconType[value]), "-");
                this.node.className = `fa fa-${slug}`;
            }
        }
        Controls.Icon = Icon;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        var Strings = Weclarative.Utils.Strings;
        class Image extends Controls.Control {
            constructor(source, width, height, highlightedSource, highlightColor) {
                super();
                if (source)
                    this.source = source;
                if (width)
                    this.width = width;
                if (height)
                    this.height = height;
                if (highlightedSource) {
                    this.onMouseEntered.add(evt => {
                        this.source = highlightedSource;
                        if (highlightColor)
                            this.style.backgroundColor = highlightColor;
                    });
                    this.onMouseExited.add(evt => {
                        this.source = source;
                        if (highlightColor)
                            this.style.backgroundColor = "inherit";
                    });
                }
            }
            get width() {
                if (this.node.hasAttribute("width"))
                    return parseInt(Strings.chopEnd(this.node.getAttribute("width"), "px"));
                else
                    return null;
            }
            set width(value) {
                if (value)
                    this.node.setAttribute("width", value + "px");
                else
                    this.node.removeAttribute("width");
            }
            get height() {
                if (this.node.hasAttribute("height"))
                    return parseInt(Strings.chopEnd(this.node.getAttribute("height"), "px"));
                else
                    return null;
            }
            set height(value) {
                if (value)
                    this.node.setAttribute("height", value + "px");
                else
                    this.node.removeAttribute("height");
            }
            get source() {
                return this.node.getAttribute("src") || undefined;
            }
            set source(value) {
                if (value)
                    this.node.setAttribute("src", value);
                else
                    this.node.removeAttribute("src");
            }
            createNode() {
                const node = document.createElement("img");
                node.style.display = "block";
                return node;
            }
        }
        Controls.Image = Image;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        class InlineText extends Controls.Control {
            constructor(value = "") {
                super("span");
                this.value = value;
            }
            get value() {
                return this.node.innerHTML;
            }
            set value(value) {
                this.node.innerHTML = value;
            }
        }
        Controls.InlineText = InlineText;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        class KeyCode {
        }
        KeyCode.Shift = 16;
        KeyCode.Ctrl = 17;
        KeyCode.Alt = 18;
        KeyCode.DownArrow = 40;
        KeyCode.UpArrow = 38;
        KeyCode.LeftArrow = 37;
        KeyCode.RightArrow = 39;
        KeyCode.PageUp = 33;
        KeyCode.PageDown = 34;
        KeyCode.Home = 36;
        KeyCode.End = 35;
        KeyCode.Meta = 91;
        KeyCode.Tab = 9;
        KeyCode.Enter = 13;
        KeyCode.Escape = 27;
        Controls.KeyCode = KeyCode;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        var Arrays = Weclarative.Utils.Arrays;
        class LayeredPanel extends Controls.Control {
            constructor() {
                super();
                this.layers = new Array();
                this.wrappers = new Array();
            }
            get background() {
                return this._background;
            }
            set background(value) {
                if (this.background != null) {
                    this.removeChild(this.background);
                    this.background.node.remove();
                }
                this._background = value;
                if (value != null) {
                    this.container.appendChild(value.node);
                    this.addChild(value);
                }
            }
            addLayer(layer, allowPointerEvents = true) {
                const wrapper = document.createElement("div");
                wrapper.style.position = "absolute";
                wrapper.style.left = "0px";
                wrapper.style.right = "0px";
                wrapper.style.top = "0px";
                wrapper.style.bottom = "0px";
                if (!allowPointerEvents)
                    wrapper.style.pointerEvents = "none";
                wrapper.appendChild(layer.node);
                if (this.background != null)
                    Weclarative.Utils.Elements.insertBefore(wrapper, this.background.node);
                else
                    this.container.appendChild(wrapper);
                this.addChild(layer);
                this.layers.push(layer);
                this.wrappers.push(wrapper);
            }
            removeLayer(layer) {
                const index = this.layers.indexOf(layer);
                const wrapper = this.wrappers[index];
                layer.node.remove();
                wrapper.remove();
                this.removeChild(layer);
                Arrays.remove(this.layers, layer);
                Arrays.remove(this.wrappers, wrapper);
            }
            createNode() {
                const table = document.createElement("table");
                const row = document.createElement("tr");
                this.cell = document.createElement("td");
                this.cell.style.verticalAlign = "middle";
                this.cell.style.position = "relative";
                this.cell.style.zIndex = "-1";
                this.container = document.createElement("div");
                this.cell.appendChild(this.container);
                row.appendChild(this.cell);
                table.appendChild(row);
                return table;
            }
        }
        Controls.LayeredPanel = LayeredPanel;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        class Link extends Controls.Control {
            constructor(content) {
                super();
                this.localHrefClickHandler = () => this.localHrefClick;
                if (content) {
                    this.text = content;
                }
                else if (content instanceof Controls.Control) {
                    this.add(content);
                }
            }
            fireClick() {
                this.onClick.trigger(new MouseEvent("click"));
            }
            get localHref() {
                return this._localHref;
            }
            set localHref(value) {
                if (this.localHref != null) {
                    this.node.setAttribute("href", "javascript:void(0);");
                    this.onClick.remove(this.localHrefClickHandler);
                }
                this._localHref = value;
                if (value != null) {
                    this.node.setAttribute("href", value);
                    this.onClick.add(this.localHrefClickHandler);
                }
            }
            set localAction(value) {
                this.localHref = Weclarative.Views.View.generateUrl(value);
            }
            localHrefClick(evt) {
                evt.preventDefault();
                this.view.viewContext.controller.application.open(this.localHref);
            }
            createNode() {
                const a = document.createElement("a");
                a.setAttribute("href", "javascript:void(0);");
                a.style.display = "inline-block";
                return a;
            }
            get text() {
                return this.node.nodeValue;
            }
            /**
             * Using this propery will remove any existing children added via Add.
             */
            set text(value) {
                this.node.innerHTML = value || "";
                this.useTextMode = true;
            }
            add(child) {
                if (this.useTextMode)
                    this.node.innerHTML = "";
                this.addChild(child);
                this.node.appendChild(child.node);
                this.useTextMode = false;
            }
            onRemove(child) {
                super.onRemove(child);
                this.node.removeChild(child.node);
            }
            remove(child) {
                this.removeChild(child);
            }
        }
        Controls.Link = Link;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        class ListBox extends Controls.Control {
            constructor(textProvider, valueProvider) {
                super();
                this.items = new Array();
                this.textProvider = textProvider || ((x) => x.toString());
                this.valueProvider = valueProvider || ((x) => x.toString());
                this.selectElement = this.node;
            }
            get isDropDown() {
                return this.node.getAttribute("size") != "1";
            }
            set isDropDown(value) {
                this.node.setAttribute("size", value ? "1" : "2");
            }
            createNode() {
                const listbox = document.createElement("select");
                listbox.addEventListener("change", evt => this.onJsChanged(evt));
                listbox.setAttribute("size", "2");
                return listbox;
            }
            add(item) {
                this.items.push(item);
                this.node.appendChild(this.createOption(item));
            }
            remove(item) {
                const index = this.items.indexOf(item);
                const child = this.node.children[index];
                this.node.removeChild(child);
                this.items.splice(index, 1);
            }
            createOption(item) {
                const option = document.createElement("option");
                option.setAttribute("value", this.formatValue(item));
                option.appendChild(document.createTextNode(this.textProvider(item)));
                return option;
            }
            formatValue(item) {
                if (this.valueProvider)
                    return this.valueProvider(item);
                else
                    return item.toString();
            }
            onJsChanged(evt) {
                if (this.onChanged)
                    this.onChanged.trigger();
            }
            get isMultiselect() {
                return this.node.hasAttribute("multiple") && this.node.getAttribute("multiple") == "true";
            }
            set isMultiselect(value) {
                if (value)
                    this.node.setAttribute("multiple", "true");
                else
                    this.node.removeAttribute("multiple");
            }
            get selectedItem() {
                const selectedIndex = this.selectElement.selectedIndex;
                if (selectedIndex >= 0)
                    return this.items[selectedIndex];
                else
                    return null;
            }
            set selectedItem(value) {
                if (value != null) {
                    const index = this.items.indexOf(value);
                    this.selectElement.selectedIndex = index;
                }
                else {
                    this.selectElement.selectedIndex = -1;
                }
            }
            get selectedItems() {
                const selectedItems = new Array();
                for (let i = 0; i < this.selectElement.selectedOptions.length; i++) {
                    const option = this.selectElement.selectedOptions[i];
                    const item = this.items[option.index];
                    selectedItems.push(item);
                }
                return selectedItems;
            }
            set selectedItems(value) {
                const valueSet = new Set(value);
                for (var i = 0; i < this.selectElement.options.length; i++) {
                    const option = this.selectElement.options[i];
                    const item = this.items[option.index];
                    option.selected = valueSet.has(item);
                }
            }
        }
        Controls.ListBox = ListBox;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        var EventHandler = Weclarative.Utils.EventHandler;
        var Arrays = Weclarative.Utils.Arrays;
        class ListView extends Controls.Control {
            constructor(textProvider = (x) => x.toString()) {
                super();
                this.highlightColor = "rgb(221, 236, 247)";
                this.highlightTextColor = "inherit";
                this.selectedColor = "rgb(0, 0, 150)";
                this.selectedTextColor = "white";
                this._items = new Array();
                this.childControls = new Map();
                this.list = new Controls.VerticalPanel();
                this._selectedIndex = -1;
                this.textProvider = textProvider;
                this.style.color = "inherit";
                this.style.backgroundColor = "white";
                this.style.border = "1px solid black";
                this.addChild(this.list);
                this.node.appendChild(this.list.node);
            }
            add(item) {
                this._items.push(item);
                const control = this.createRow(item);
                this.list.add(control);
                this.childControls.set(item, control);
            }
            remove(item) {
                const row = this.childControls.get(item);
                this.list.remove(row);
                Arrays.remove(this._items, item);
                this.childControls.delete(item);
            }
            clear() {
                while (this._items.length > 0)
                    this.remove(this._items[this._items.length - 1]);
            }
            get items() {
                return this._items;
            }
            get selectedIndex() {
                return this._selectedIndex;
            }
            set selectedIndex(value) {
                if (this.selectedIndex != value) {
                    if (this.selectedIndex != -1) {
                        const item = this.items[this.selectedIndex];
                        const control = this.childControls.get(item);
                        control.style.backgroundColor = this.style.backgroundColor;
                        control.style.color = this.style.color;
                    }
                    this._selectedIndex = value;
                    if (value != -1) {
                        const item = this.items[value];
                        const control = this.childControls.get(item);
                        control.style.backgroundColor = this.selectedColor;
                        control.style.color = this.selectedTextColor;
                    }
                    this.onChanged.trigger();
                }
            }
            get onChanged() {
                if (this._onChanged == null) {
                    this._onChanged = new EventHandler();
                }
                return this._onChanged;
            }
            get selectedItem() {
                return this.selectedIndex == -1 ? null : this.items[this.selectedIndex];
            }
            set selectedItem(value) {
                this.selectedIndex = value == undefined ? -1 : this.items.indexOf(value);
            }
            createRow(item) {
                const text = new Controls.TextBlock(this.textProvider(item));
                text.style.paddingLeft = "5px";
                text.style.paddingRight = "5px";
                text.onMouseEntered.add(() => {
                    text.style.backgroundColor = this.highlightColor;
                    text.style.color = this.highlightTextColor;
                });
                text.onMouseExited.add(() => {
                    text.style.backgroundColor = this.style.backgroundColor;
                    text.style.color = this.style.color;
                });
                return text;
            }
            selectNextItem() {
                if (this.items.length > 0) {
                    if (this.selectedIndex == -1) {
                        this.selectedIndex = 0;
                    }
                    else {
                        if (this.items.length > this.selectedIndex + 1)
                            this.selectedIndex = this.selectedIndex + 1;
                        else
                            this.selectedIndex = 0;
                    }
                }
            }
            selectPreviousItem() {
                if (this.items.length > 0) {
                    if (this.selectedIndex == -1) {
                        this.selectedIndex = this.items.length - 1;
                    }
                    else {
                        if (this.selectedIndex < 1)
                            this.selectedIndex = this.items.length - 1;
                        else
                            this.selectedIndex = this.selectedIndex - 1;
                    }
                }
            }
        }
        Controls.ListView = ListView;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        /**
         * A control that renders each successive pairs added to it as a label
         * and a value.  This control uses a TablePanel to align the labels in
         * one column with each label aligned right and the values in the right
         * column occupying the remaining width aligned left.
         */
        class NameValuePanel extends Controls.Control {
            constructor() {
                super();
                this.table = new Controls.TablePanel(Controls.TablePanelWidth.preferred(), Controls.TablePanelWidth.weight());
                this.table.cellSpacing = 0;
                this.table.node.style.width = "100%";
                this.table.node.style.height = "100%";
                this.node.appendChild(this.table.node);
            }
            get spacing() {
                return this.table.cellSpacing;
            }
            set spacing(value) {
                this.table.cellSpacing = value;
            }
            add(control) {
                const isNameControl = this.count % 2 == 0;
                const lastControl = this.getChild(this.count - 1);
                this.addChild(control);
                const cell = this.table.add(control, Controls.TablePanelConstraint.horizontalAlignment(isNameControl ? Controls.HorizontalAlignment.Right : Controls.HorizontalAlignment.Left));
                if (isNameControl)
                    cell.style.whiteSpace = "nowrap";
                else
                    control.associatedLabel = lastControl;
            }
            addPair(name, value) {
                this.add(name);
                this.add(value);
                value.style.width = "100%";
            }
        }
        Controls.NameValuePanel = NameValuePanel;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        class SidePanel extends Controls.Control {
            constructor(spacing = 0) {
                super("table");
                if (spacing != 0)
                    this.spacing = spacing;
            }
            getTopRow() {
                if (this.topRow == null) {
                    this.topRow = document.createElement("tr");
                    Weclarative.Utils.Elements.prepend(this.node, this.topRow);
                }
                return this.topRow;
            }
            getMiddleRow() {
                if (this.middleRow == null) {
                    this.middleRow = document.createElement("tr");
                    if (this.topRow != null)
                        Weclarative.Utils.Elements.insertAfter(this.node, this.middleRow, this.topRow);
                    else
                        Weclarative.Utils.Elements.prepend(this.node, this.middleRow);
                    if (this.spacing != 0 && this.topRow != null)
                        this.topCellContent.style.paddingBottom = this.spacing + "px";
                }
                return this.middleRow;
            }
            getBottomRow() {
                if (this.bottomRow == null) {
                    this.bottomRow = document.createElement("tr");
                    this.node.appendChild(this.bottomRow);
                }
                return this.bottomRow;
            }
            getTopCell() {
                if (this.topCell == null) {
                    const topCell = document.createElement("td");
                    const topCellContent = document.createElement("div");
                    topCell.setAttribute("colspan", "3");
                    this.getTopRow().appendChild(topCell);
                    topCellContent.style.width = "100%";
                    topCellContent.style.height = "100%";
                    topCell.appendChild(topCellContent);
                    if (this.spacing != 0 && (this.middleRow != null || this.bottomRow != null)) {
                        topCellContent.style.paddingBottom = this.spacing + "px";
                    }
                    this.topCell = topCell;
                    this.topCellContent = topCellContent;
                }
                return this.topCellContent;
            }
            getBottomCell() {
                if (this.bottomCell == null) {
                    const bottomCell = document.createElement("td");
                    const bottomCellContent = document.createElement("div");
                    bottomCell.setAttribute("colspan", "3");
                    this.getBottomRow().appendChild(bottomCell);
                    bottomCellContent.style.width = "100%";
                    bottomCellContent.style.height = "100%";
                    bottomCell.appendChild(bottomCellContent);
                    if (this.spacing != 0 && this.middleRow != null) {
                        bottomCellContent.style.paddingTop = this.spacing + "px";
                    }
                    this.bottomCell = bottomCell;
                    this.bottomCellContent = bottomCellContent;
                }
                return this.bottomCellContent;
            }
            adjustColSpan() {
                if (this.leftCell != null)
                    this.leftCell.setAttribute("colspan", this.center == null && this.right == null ? "3" : "1");
                if (this.centerCell != null)
                    this.centerCell.setAttribute("colspan", this.left != null && this.right != null ? "1" : this.left != null || this.right != null ? "2" : "3");
                if (this.rightCell != null)
                    this.rightCell.setAttribute("colspan", this.center == null && this.left == null ? "3" : "1");
            }
            getLeftCell() {
                if (this.leftCell == null) {
                    const leftCell = document.createElement("td");
                    const leftCellContent = document.createElement("div");
                    leftCell.style.height = "100%";
                    this.adjustColSpan();
                    Weclarative.Utils.Elements.prepend(this.getMiddleRow(), leftCell);
                    leftCellContent.style.width = "100%";
                    leftCellContent.style.height = "100%";
                    leftCell.appendChild(leftCellContent);
                    if (this.spacing != 0 && (this.centerCell != null || this.rightCell != null))
                        leftCellContent.style.paddingLeft = this.spacing + "px";
                    this.leftCell = leftCell;
                    this.leftCellContent = leftCellContent;
                }
                return this.leftCellContent;
            }
            getCenterCell() {
                if (this.centerCell == null) {
                    const centerCell = document.createElement("td");
                    const centerCellContent = document.createElement("div");
                    centerCell.style.height = "100%";
                    centerCell.style.width = "100%";
                    this.adjustColSpan();
                    if (this.leftCell != null)
                        Weclarative.Utils.Elements.insertAfter(this.getMiddleRow(), centerCell, this.leftCell);
                    else
                        Weclarative.Utils.Elements.prepend(this.getMiddleRow(), centerCell);
                    centerCellContent.style.width = "100%";
                    centerCellContent.style.height = "100%";
                    centerCell.appendChild(centerCellContent);
                    this.centerCell = centerCell;
                    this.centerCellContent = centerCellContent;
                }
                return this.centerCellContent;
            }
            getRightCell() {
                if (this.rightCell == null) {
                    const rightCell = document.createElement("td");
                    const rightCellContent = document.createElement("div");
                    rightCell.style.height = "100%";
                    this.adjustColSpan();
                    this.getMiddleRow().appendChild(rightCell);
                    rightCellContent.style.width = "100%";
                    rightCellContent.style.height = "100%";
                    rightCell.appendChild(rightCellContent);
                    if (this.spacing != 0 && this.middleRow != null) {
                        rightCellContent.style.paddingLeft = this.spacing + "px";
                    }
                    this.rightCell = rightCell;
                    this.rightCellContent = rightCellContent;
                }
                return this.rightCellContent;
            }
            removeTopRow() {
                if (this.topRow != null)
                    this.topRow.remove();
                this.topRow = null;
            }
            removeMiddleRow() {
                if (this.middleRow != null) {
                    this.middleRow.remove();
                    if (this.topCell != null && this.bottom == null)
                        this.topCell.style.paddingBottom = "";
                }
                this.middleRow = null;
            }
            removeBottomRow() {
                if (this.bottomRow != null)
                    this.bottomRow.remove();
                this.bottomRow = null;
            }
            removeMiddleRowIfEmpty() {
                if (this.leftCell == null && this.centerCell == null && this.rightCell == null)
                    this.removeMiddleRow();
            }
            removeTopCell() {
                if (this.topCell != null)
                    this.topCell.remove();
                this.topCell = null;
                this.topCellContent = null;
                this.removeTopRow();
            }
            removeBottomCell() {
                if (this.bottomCell != null)
                    this.bottomCell.remove();
                this.bottomCell = null;
                this.bottomCellContent = null;
            }
            removeLeftCell() {
                if (this.leftCell != null)
                    this.leftCell.remove();
                this.leftCell = null;
                this.leftCellContent = null;
                this.removeMiddleRowIfEmpty();
            }
            removeCenterCell() {
                if (this.centerCell != null) {
                    this.centerCell.remove();
                    if (this.leftCell != null && this.right == null)
                        this.leftCell.style.paddingRight = "";
                }
                this.centerCell = null;
                this.centerCellContent = null;
                this.removeMiddleRowIfEmpty();
            }
            removeRightCell() {
                if (this.rightCell != null)
                    this.rightCell.remove();
                this.rightCell = null;
                this.rightCellContent = null;
                this.removeMiddleRowIfEmpty();
            }
            get top() {
                return this._top;
            }
            set top(value) {
                if (this.top != null) {
                    this.removeChild(this.top);
                    this.removeTopCell();
                }
                this._top = value;
                if (value != null) {
                    this.getTopCell().appendChild(value.node);
                    this.addChild(value);
                }
            }
            get bottom() {
                return this._bottom;
            }
            set bottom(value) {
                if (this.bottom != null) {
                    this.removeChild(this.bottom);
                    this.removeBottomCell();
                }
                this._bottom = value;
                if (value != null) {
                    this.getBottomCell().appendChild(value.node);
                    this.addChild(value);
                }
            }
            get left() {
                return this._left;
            }
            set left(value) {
                if (this.left != null) {
                    this.removeChild(this.left);
                    this.removeLeftCell();
                }
                this._left = value;
                if (value != null) {
                    this.getLeftCell().appendChild(value.node);
                    this.addChild(value);
                }
            }
            get center() {
                return this._center;
            }
            set center(value) {
                if (this.center != null) {
                    this.removeChild(this.center);
                    this.removeCenterCell();
                }
                this._center = value;
                if (value != null) {
                    this.getCenterCell().appendChild(value.node);
                    this.addChild(value);
                }
            }
            get right() {
                return this._right;
            }
            set right(value) {
                if (this.right != null) {
                    this.removeChild(this.right);
                    this.removeRightCell();
                }
                this._right = value;
                if (value != null) {
                    this.getRightCell().appendChild(value.node);
                    this.addChild(value);
                }
            }
            get spacing() {
                return this._spacing;
            }
            set spacing(value) {
                this._spacing = value;
                if (this.top != null && (this.left != null || this.center != null || this.right != null || this.bottom != null))
                    this.getTopCell().style.paddingBottom = value + "px";
                if (this.left != null && (this.center != null || this.right != null))
                    this.getLeftCell().style.paddingRight = value + "px";
                if (this.right != null && this.center != null)
                    this.getRightCell().style.paddingLeft = value + "px";
                if (this.bottom != null && (this.left != null || this.center != null || this.right != null))
                    this.getBottomCell().style.paddingTop = value + "px";
            }
        }
        Controls.SidePanel = SidePanel;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        /**
         * Establishes a header that can be populated with arbitrary content and that can
         * animate downwards when content is populated and animate upward when content is
         * cleared.  This is useful for showing validation failures.
         */
        class SlideDownHeaderPanel extends Controls.Control {
            constructor() {
                super();
            }
            createNode() {
                this.headerDiv = document.createElement("div");
                this.headerDiv.style.position = "absolute";
                this.headerDiv.style.width = "100%";
                this.headerContainerDiv = document.createElement("div");
                this.headerContainerDiv.style.position = "relative";
                this.headerContainerDiv.style.overflow = "hidden";
                this.headerContainerDiv.style.zIndex = "-1";
                this.headerContainerDiv.appendChild(this.headerDiv);
                this.contentDiv = document.createElement("div");
                const result = document.createElement("div");
                result.appendChild(this.headerContainerDiv);
                result.appendChild(this.contentDiv);
                return result;
            }
            get header() {
                return this._header;
            }
            set header(value) {
                if (this.header != null) {
                    this.slideUp();
                    this.headerDiv.removeChild(this.header.node);
                    this.removeChild(this.header);
                }
                this._header = value;
                if (value != null) {
                    this.headerDiv.appendChild(value.node);
                    this.addChild(value);
                    this.slideDown();
                }
            }
            get content() {
                return this._content;
            }
            set content(value) {
                if (this.content != null) {
                    this.contentDiv.removeChild(this.content.node);
                    this.removeChild(this.content);
                }
                this._content = value;
                if (value != null) {
                    this.contentDiv.appendChild(value.node);
                    this.addChild(value);
                }
            }
            slideUp() {
                this.headerDiv.style.position = "absolute";
                this.headerContainerDiv.style.height = "0px";
            }
            slideDown() {
                const height = this.headerDiv.offsetHeight;
                this.headerDiv.style.top = -height + "px";
                this.headerDiv.style.position = "absolute";
                Weclarative.Utils.Animator.animate(progress => {
                    const newHeight = Math.min(progress * height, height);
                    this.headerDiv.style.top = (-height + newHeight) + "px";
                    this.headerContainerDiv.style.height = newHeight + "px";
                }, SlideDownHeaderPanel.duration, () => {
                    // Reset the style so that it fits into the normal HTML flow.  This ensure that,
                    // after animating, the slid-down content will resize, refit its contents, etc.
                    // if the window resizes.
                    this.headerDiv.style.position = "relative";
                    this.headerContainerDiv.style.height = "inherit";
                });
            }
        }
        SlideDownHeaderPanel.duration = 300; // milliseconds
        Controls.SlideDownHeaderPanel = SlideDownHeaderPanel;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        class TablePanelPoint {
            constructor(x, y) {
                this.x = x;
                this.y = y;
            }
        }
        Controls.TablePanelPoint = TablePanelPoint;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        (function (TablePanelWidthStyle) {
            TablePanelWidthStyle[TablePanelWidthStyle["Pixels"] = 0] = "Pixels";
            TablePanelWidthStyle[TablePanelWidthStyle["Percent"] = 1] = "Percent";
            TablePanelWidthStyle[TablePanelWidthStyle["Weight"] = 2] = "Weight";
            TablePanelWidthStyle[TablePanelWidthStyle["MaxPreferredWidth"] = 3] = "MaxPreferredWidth";
        })(Controls.TablePanelWidthStyle || (Controls.TablePanelWidthStyle = {}));
        var TablePanelWidthStyle = Controls.TablePanelWidthStyle;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        class TablePanelWidth {
            constructor(value, style = Controls.TablePanelWidthStyle.Pixels) {
                this.value = value;
                this.style = style;
            }
            static percent(value) {
                return new TablePanelWidth(value, Controls.TablePanelWidthStyle.Percent);
            }
            static exact(value) {
                return new TablePanelWidth(value, Controls.TablePanelWidthStyle.Pixels);
            }
            static weight(value = 1) {
                return new TablePanelWidth(value, Controls.TablePanelWidthStyle.Weight);
            }
            static preferred(value = 0) {
                return new TablePanelWidth(value, Controls.TablePanelWidthStyle.MaxPreferredWidth);
            }
            static allPreferred(numberOfColumns) {
                const result = new Array(numberOfColumns);
                for (let i = 0; i < numberOfColumns; i++) {
                    result[i] = TablePanelWidth.preferred();
                }
                return result;
            }
            static allWeight(numberOfColumns) {
                const result = new Array(numberOfColumns);
                for (let i = 0; i < numberOfColumns; i++) {
                    result[i] = TablePanelWidth.weight();
                }
                return result;
            }
        }
        Controls.TablePanelWidth = TablePanelWidth;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        class TablePanelConstraint {
            constructor(horizontalAlignment, verticalAlignment, columnSpan, rowSpan) {
                this.horizontalAlignment = horizontalAlignment || Controls.HorizontalAlignment.Fill;
                this.verticalAlignment = verticalAlignment || Controls.VerticalAlignment.Fill;
                this.columnSpan = columnSpan || 1;
                this.rowSpan = rowSpan || 1;
            }
            static horizontalAlignment(alignment) {
                return new TablePanelConstraint(alignment);
            }
            static verticalAlignment(alignment) {
                return new TablePanelConstraint(undefined, alignment);
            }
            static spanCols(span) {
                return new TablePanelConstraint(undefined, undefined, span);
            }
            static spanRows(span) {
                return new TablePanelConstraint(undefined, undefined, undefined, span);
            }
            static centered() {
                return new TablePanelConstraint(Controls.HorizontalAlignment.Center, Controls.VerticalAlignment.Middle);
            }
            static left() {
                return new TablePanelConstraint(Controls.HorizontalAlignment.Left, Controls.VerticalAlignment.Middle);
            }
            static right() {
                return new TablePanelConstraint(Controls.HorizontalAlignment.Right, Controls.VerticalAlignment.Middle);
            }
            static topLeft() {
                return new TablePanelConstraint(Controls.HorizontalAlignment.Left, Controls.VerticalAlignment.Top);
            }
            static topCenter() {
                return new TablePanelConstraint(Controls.HorizontalAlignment.Center, Controls.VerticalAlignment.Top);
            }
            static topRight() {
                return new TablePanelConstraint(Controls.HorizontalAlignment.Right, Controls.VerticalAlignment.Top);
            }
            static middleLeft() {
                return new TablePanelConstraint(Controls.HorizontalAlignment.Left, Controls.VerticalAlignment.Middle);
            }
            static middleRight() {
                return new TablePanelConstraint(Controls.HorizontalAlignment.Right, Controls.VerticalAlignment.Middle);
            }
            static bottomLeft() {
                return new TablePanelConstraint(Controls.HorizontalAlignment.Left, Controls.VerticalAlignment.Bottom);
            }
            static bottomCenter() {
                return new TablePanelConstraint(Controls.HorizontalAlignment.Center, Controls.VerticalAlignment.Bottom);
            }
            static bottomRight() {
                return new TablePanelConstraint(Controls.HorizontalAlignment.Right, Controls.VerticalAlignment.Bottom);
            }
        }
        Controls.TablePanelConstraint = TablePanelConstraint;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        class TablePanel extends Controls.Control {
            constructor(...columnWidths) {
                super();
                this.rows = new Array();
                this.cells = new Array();
                this.columnWidths = columnWidths;
                this.defaultConstraint = new Controls.TablePanelConstraint();
                const totalNumberOfWeights = this.columnWidths.filter(x => x.style == Controls.TablePanelWidthStyle.Weight).map(x => x.value).reduce((a, b) => a + b, 0);
                const totalPercent = this.columnWidths.filter(x => x.style == Controls.TablePanelWidthStyle.Percent).map(x => x.value).reduce((a, b) => a + b, 0);
                const percentAvailableToWeights = 100 - totalPercent;
                if (percentAvailableToWeights < 0)
                    throw new Error("Total amount of percent specified is greater than 100");
                const percentToEachWeight = percentAvailableToWeights / totalNumberOfWeights;
                let extraPercent = percentAvailableToWeights - percentToEachWeight * totalNumberOfWeights;
                const colGroup = document.createElement("colgroup");
                for (let width of this.columnWidths) {
                    const col = document.createElement("col");
                    switch (width.style) {
                        case Controls.TablePanelWidthStyle.Pixels:
                            col.style.width = width.value + "px";
                            break;
                        case Controls.TablePanelWidthStyle.Weight:
                            let currentWeight = percentToEachWeight * width.value;
                            currentWeight += extraPercent;
                            extraPercent = 0;
                            col.style.width = currentWeight + "%";
                            break;
                        case Controls.TablePanelWidthStyle.Percent:
                            col.style.width = width.value + "%";
                            break;
                    }
                    colGroup.appendChild(col);
                }
                this.table.appendChild(colGroup);
            }
            get verticalCellSpacing() {
                return this._verticalCellSpacing;
            }
            set verticalCellSpacing(value) {
                this._verticalCellSpacing = value;
                this.resetCellSpacing();
            }
            get horizontalCellSpacing() {
                return this._horizontalCellSpacing;
            }
            set horizontalCellSpacing(value) {
                this._horizontalCellSpacing = value;
                this.resetCellSpacing();
            }
            get cellSpacing() {
                return this.horizontalCellSpacing;
            }
            set cellSpacing(value) {
                this.verticalCellSpacing = value;
                this.horizontalCellSpacing = value;
                this.resetCellSpacing();
            }
            resetCellSpacing() {
                for (let i = 0; i < this.rows.length; i++) {
                    const row = this.rows[i];
                    for (let j = 0; j < row.children.length; j++) {
                        const cell = row.children[j];
                        const isLastCellInRow = j == row.children.length - 1;
                        const isLastRowInTable = i == this.rows.length - 1;
                        if (!isLastCellInRow)
                            cell.style.paddingRight = this.horizontalCellSpacing + "px";
                        if (!isLastRowInTable)
                            cell.style.paddingBottom = this.verticalCellSpacing + "px";
                    }
                }
            }
            createNode() {
                this.table = document.createElement("table");
                return this.table;
            }
            getNextEmptyCell() {
                let x = 0;
                let y = 0;
                for (const row of this.cells) {
                    for (let cell of row) {
                        if (!cell)
                            return new Controls.TablePanelPoint(x, y);
                        x++;
                    }
                    x = 0;
                    y++;
                }
                return new Controls.TablePanelPoint(x, y);
            }
            add(cell, constraint) {
                this.addChild(cell);
                const nextEmptyCell = this.getNextEmptyCell();
                constraint = constraint || this.defaultConstraint;
                const jsCellDiv = document.createElement("div");
                if (constraint != null) {
                    if (nextEmptyCell.x + constraint.columnSpan > this.columnWidths.length)
                        throw new Error(`Added a cell at position (${nextEmptyCell.x},${nextEmptyCell.y}), but the column (${constraint.columnSpan}) exceeds the available remaining space in the row (${this.columnWidths.length - nextEmptyCell.x}).`);
                    const jsCell = document.createElement("td");
                    if (constraint.columnSpan != 1)
                        jsCell.setAttribute("colspan", constraint.columnSpan.toString());
                    if (constraint.rowSpan != 1)
                        jsCell.setAttribute("rowspan", constraint.rowSpan.toString());
                    jsCell.appendChild(jsCellDiv);
                    switch (constraint.horizontalAlignment) {
                        case Controls.HorizontalAlignment.Left:
                            jsCell.setAttribute("align", "left");
                            break;
                        case Controls.HorizontalAlignment.Center:
                            jsCell.setAttribute("align", "center");
                            break;
                        case Controls.HorizontalAlignment.Right:
                            jsCell.setAttribute("align", "right");
                            break;
                        case Controls.HorizontalAlignment.Fill:
                            jsCellDiv.style.width = "100%";
                            cell.node.style.width = "100%";
                            break;
                    }
                    switch (constraint.verticalAlignment) {
                        case Controls.VerticalAlignment.Top:
                            jsCell.style.verticalAlign = "top";
                            break;
                        case Controls.VerticalAlignment.Middle:
                            jsCell.style.verticalAlign = "middle";
                            break;
                        case Controls.VerticalAlignment.Bottom:
                            jsCell.style.verticalAlign = "bottom";
                            break;
                        case Controls.VerticalAlignment.Fill:
                            cell.node.style.height = "100%";
                            jsCellDiv.style.height = "100%";
                            break;
                    }
                    jsCellDiv.appendChild(cell.node);
                    for (let row = nextEmptyCell.y; row < nextEmptyCell.y + constraint.rowSpan; row++) {
                        for (let col = nextEmptyCell.x; col < nextEmptyCell.x + constraint.columnSpan; col++) {
                            while (this.cells.length <= row) {
                                this.cells.push(new Array(this.columnWidths.length));
                                const newRow = document.createElement("tr");
                                this.table.appendChild(newRow);
                                this.rows.push(newRow);
                            }
                            if (this.cells[row][col] != null)
                                throw new Error("Illegal layout: cannot add a control at row " + row + ", column " + col + " as another control is already present: " + this.cells[row][col]);
                            this.cells[row][col] = cell;
                        }
                    }
                    const isFirstRowInTable = nextEmptyCell.y == 0;
                    const isLastCellInRow = nextEmptyCell.x + constraint.columnSpan == this.columnWidths.length;
                    if (!isLastCellInRow && this.horizontalCellSpacing != 0)
                        jsCell.style.paddingRight = this.horizontalCellSpacing + "px";
                    if (!isFirstRowInTable)
                        jsCell.style.paddingTop = this.verticalCellSpacing + "px";
                    const jsRow = this.rows[nextEmptyCell.y];
                    jsRow.appendChild(jsCell);
                }
                return jsCellDiv;
            }
        }
        Controls.TablePanel = TablePanel;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        var EventHandler = Weclarative.Utils.EventHandler;
        class TextArea extends Controls.Control {
            constructor() {
                super("textarea");
                this.element = this.node;
                this.element.addEventListener("change", evt => this.onJsChanged(evt));
            }
            get onChanged() {
                if (this._onChanged == null)
                    this._onChanged = new EventHandler();
                return this._onChanged;
            }
            get type() {
                return Controls.TextBoxType[this.node.getAttribute("type")];
            }
            set type(value) {
                this.node.setAttribute("type", Controls.TextBoxType[value]);
            }
            get name() {
                return this.node.getAttribute("name");
            }
            set name(value) {
                if (value)
                    this.node.setAttribute("name", value);
                else
                    this.node.removeAttribute("name");
            }
            get placeholder() {
                return this.node.getAttribute("placeholder");
            }
            set placeholder(value) {
                if (value)
                    this.node.setAttribute("placeholder", value);
                else
                    this.node.removeAttribute("placeholder");
            }
            get isWrappingEnabled() {
                return this.node.getAttribute("wrap") == "hard";
            }
            set isWrappingEnabled(value) {
                this.node.setAttribute("wrap", value ? "hard" : "soft");
            }
            get text() {
                return this.element.value;
            }
            set text(value) {
                this.element.value = value;
            }
            onJsChanged(evt) {
                if (this._onChanged != null)
                    this._onChanged.trigger();
            }
        }
        Controls.TextArea = TextArea;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        class TextBlock extends Controls.Control {
            constructor(value = "") {
                super("div");
                this.value = value;
            }
            get value() {
                return this.node.innerHTML;
            }
            set value(value) {
                this.node.innerHTML = value;
            }
        }
        Controls.TextBlock = TextBlock;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        (function (TextBoxType) {
            TextBoxType[TextBoxType["Text"] = 0] = "Text";
            TextBoxType[TextBoxType["Password"] = 1] = "Password";
            TextBoxType[TextBoxType["Color"] = 2] = "Color";
            TextBoxType[TextBoxType["Email"] = 3] = "Email";
            TextBoxType[TextBoxType["Number"] = 4] = "Number";
            TextBoxType[TextBoxType["Range"] = 5] = "Range";
            TextBoxType[TextBoxType["Search"] = 6] = "Search";
            TextBoxType[TextBoxType["Telephone"] = 7] = "Telephone";
            TextBoxType[TextBoxType["Url"] = 8] = "Url";
            TextBoxType[TextBoxType["Date"] = 9] = "Date";
            TextBoxType[TextBoxType["DateTime"] = 10] = "DateTime";
            TextBoxType[TextBoxType["Time"] = 11] = "Time";
        })(Controls.TextBoxType || (Controls.TextBoxType = {}));
        var TextBoxType = Controls.TextBoxType;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        class TextBox extends Controls.Control {
            constructor() {
                super();
            }
            get type() {
                return Controls.TextBoxType[this.node.getAttribute("type")];
            }
            set type(value) {
                this.node.setAttribute("type", Controls.TextBoxType[value]);
            }
            get name() {
                return this.node.getAttribute("name");
            }
            set name(value) {
                if (value)
                    this.node.setAttribute("name", value);
                else
                    this.node.removeAttribute("name");
            }
            get placeholder() {
                return this.node.getAttribute("placeholder");
            }
            set placeholder(value) {
                if (value)
                    this.node.setAttribute("placeholder", value);
                else
                    this.node.removeAttribute("placeholder");
            }
            get maxLength() {
                const maxLength = this.node.getAttribute("maxlength");
                return maxLength ? parseInt(maxLength) : null;
            }
            set maxLength(value) {
                if (value)
                    this.node.setAttribute("maxlength", value.toString());
                else
                    this.node.removeAttribute("maxlength");
            }
            createNode() {
                const textBox = document.createElement("input");
                textBox.setAttribute("type", "text");
                textBox.addEventListener("change", evt => this.onJsChanged(evt));
                this.inputElement = textBox;
                return textBox;
            }
            onJsChanged(evt) {
                if (this.onChanged)
                    this.onChanged.trigger();
            }
            get text() {
                return this.inputElement.value;
            }
            set text(value) {
                this.inputElement.value = value;
            }
        }
        Controls.TextBox = TextBox;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        class TitledPanel extends Controls.Control {
            constructor(title = "") {
                super();
                this.title = title;
            }
            createNode() {
                this.legend = document.createElement("legend");
                this.contentDiv = document.createElement("div");
                const fieldSet = document.createElement("fieldset");
                fieldSet.style.border = "2px threedface groove";
                fieldSet.style.padding = "10px";
                fieldSet.appendChild(this.legend);
                fieldSet.appendChild(this.contentDiv);
                return fieldSet;
            }
            get title() {
                return this.legend.innerHTML;
            }
            set title(value) {
                this.legend.innerHTML = value;
            }
            get content() {
                return this._content;
            }
            set content(value) {
                if (this.content != null) {
                    this.removeChild(this.content);
                    this.contentDiv.removeChild(this.content.node);
                }
                this._content = value;
                if (value != null) {
                    this.contentDiv.appendChild(value.node);
                    this.addChild(value);
                }
            }
        }
        Controls.TitledPanel = TitledPanel;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        class VerticalPanel extends Controls.Control {
            constructor(defaultAlignment = Controls.HorizontalAlignment.Fill) {
                super();
                this.defaultAlignment = defaultAlignment;
            }
            get verticalAlignment() {
                if (this.firstSpacer == null && this.lastSpacer == null)
                    return Controls.VerticalAlignment.Fill;
                else if (this.firstSpacer != null && this.lastSpacer != null)
                    return Controls.VerticalAlignment.Middle;
                else if (this.firstSpacer != null)
                    return Controls.VerticalAlignment.Bottom;
                else if (this.lastSpacer != null)
                    return Controls.VerticalAlignment.Top;
                else
                    throw new Error();
            }
            set verticalAlignment(value) {
                if (this.firstSpacer != null) {
                    this.firstSpacer.remove();
                    this.firstSpacer = null;
                }
                if (this.lastSpacer != null) {
                    this.lastSpacer.remove();
                    this.lastSpacer = null;
                }
                switch (value) {
                    case Controls.VerticalAlignment.Fill:
                        break;
                    case Controls.VerticalAlignment.Middle:
                        this.firstSpacer = document.createElement("tr");
                        const middleFirstSpacerCell = document.createElement("td");
                        middleFirstSpacerCell.style.height = "50%";
                        this.firstSpacer.appendChild(middleFirstSpacerCell);
                        this.table.insertBefore(this.firstSpacer, this.table.firstChild);
                        this.lastSpacer = document.createElement("tr");
                        const middleLastSpacerCell = document.createElement("td");
                        middleLastSpacerCell.style.height = "50%";
                        this.lastSpacer.appendChild(middleLastSpacerCell);
                        this.table.appendChild(middleLastSpacerCell);
                        break;
                    case Controls.VerticalAlignment.Top:
                        this.lastSpacer = document.createElement("tr");
                        const topLastSpacerCell = document.createElement("td");
                        topLastSpacerCell.style.height = "100%";
                        this.lastSpacer.appendChild(topLastSpacerCell);
                        this.table.appendChild(this.lastSpacer);
                        break;
                    case Controls.VerticalAlignment.Bottom:
                        this.firstSpacer = document.createElement("tr");
                        const bottomFirstSpacerCell = document.createElement("td");
                        bottomFirstSpacerCell.style.height = "100%";
                        this.firstSpacer.appendChild(bottomFirstSpacerCell);
                        this.table.appendChild(this.firstSpacer);
                        break;
                }
            }
            get spacing() {
                return this._spacing;
            }
            set spacing(value) {
                const difference = value - this._spacing;
                this._spacing = value;
                for (let i = 0; i < this.table.children.length; i++) {
                    const row = this.table.children[i];
                    const div = row.children[0];
                    const existingMargin = div.style.marginTop;
                    const existingSpacing = existingMargin == "" ? 0 : parseInt(existingMargin.substring(0, existingMargin.length - 2));
                    const newSpacing = existingSpacing + difference;
                    div.style.marginTop = newSpacing + "px";
                }
            }
            createNode() {
                this.table = document.createElement("table");
                this.table.style.width = "100%";
                const div = document.createElement("div");
                div.appendChild(this.table);
                return div;
            }
            add(child, alignment, spaceAbove, animate = false) {
                this.table.appendChild(this.internalAdd(child, alignment || this.defaultAlignment, spaceAbove || 0, animate));
            }
            internalAdd(child, alignment, spaceAbove, animate) {
                if (this.count > 0)
                    spaceAbove += this.spacing;
                super.addChild(child);
                const row = document.createElement("tr");
                const cell = document.createElement("td");
                const div = document.createElement("div");
                cell.appendChild(div);
                switch (alignment) {
                    case Controls.HorizontalAlignment.Fill:
                        child.node.style.width = "100%";
                        div.style.width = "100%";
                        break;
                    case Controls.HorizontalAlignment.Left:
                        cell.setAttribute("align", "left");
                        break;
                    case Controls.HorizontalAlignment.Center:
                        cell.setAttribute("align", "center");
                        break;
                    case Controls.HorizontalAlignment.Right:
                        cell.setAttribute("align", "right");
                        break;
                }
                if (spaceAbove != 0) {
                    div.style.marginTop = spaceAbove + "px";
                }
                div.appendChild(child.node);
                row.appendChild(cell);
                if (animate) {
                    const height = Weclarative.Utils.Elements.measureOffsetHeight(row);
                    row.style.display = "none";
                    div.style.overflow = "hidden";
                    Weclarative.Utils.Animator.animate((progress) => {
                        const newHeight = Math.floor(height * progress);
                        div.style.height = newHeight + "px";
                        row.style.display = "";
                    }, VerticalPanel.animationSpeed, () => {
                        div.style.overflow = "";
                        div.style.height = "";
                    });
                }
                return row;
            }
            insertBefore(child, insertBefore, alignment, spaceAbove = 0, animate = false) {
                if (insertBefore.parent != this)
                    throw new Error("Cannot use a reference node that is not contained by this control");
                alignment = alignment || this.defaultAlignment;
                const div = insertBefore.node.parentElement;
                const cell = div.parentElement;
                const row = cell.parentElement;
                const childNode = this.internalAdd(child, alignment, spaceAbove, animate);
                this.node.insertBefore(childNode, row);
            }
            insertAfter(child, insertAfter, alignment, spaceAbove = 0, animate = false) {
                if (insertAfter.parent != this)
                    throw new Error("Cannot use a reference node that is not contained by this control");
                alignment = alignment || this.defaultAlignment;
                const div = insertAfter.node.parentElement;
                const cell = div.parentElement;
                const row = cell.parentElement;
                const childNode = this.internalAdd(child, alignment, spaceAbove, animate);
                Weclarative.Utils.Elements.insertAfter(this.node, childNode, row);
            }
            replace(oldChild, newChild) {
                if (oldChild.parent != this)
                    throw new Error("Cannot replace out a child that is not contained by this control");
                oldChild.node.parentElement.replaceChild(newChild.node, oldChild.node);
                this.removeChild(oldChild);
                this.addChild(newChild);
            }
            remove(child, animate = false) {
                const div = child.node.parentElement;
                const cell = div.parentElement;
                const row = cell.parentElement;
                if (animate) {
                    const height = Weclarative.Utils.Elements.measureOffsetHeight(row);
                    div.style.overflow = "hidden";
                    Weclarative.Utils.Animator.animate((progress) => {
                        const newHeight = Math.floor(height * (1 - progress));
                        div.style.height = newHeight + "px";
                    }, VerticalPanel.animationSpeed, () => {
                        div.style.overflow = "";
                        div.style.height = "";
                        div.removeChild(child.node);
                        this.table.removeChild(row);
                        super.removeChild(child);
                    });
                }
                else {
                    div.removeChild(child.node);
                    this.table.removeChild(row);
                    super.removeChild(child);
                }
            }
            removeChild(child) {
                this.remove(child);
            }
            removeAll() {
                super.removeAll();
            }
        }
        VerticalPanel.animationSpeed = 250;
        Controls.VerticalPanel = VerticalPanel;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        var Arrays = Weclarative.Utils.Arrays;
        class AutoCompleteTextBox extends Controls.Control {
            constructor(textProvider, multiselect = false) {
                super();
                this.textProvider = textProvider;
                this.multiselect = multiselect;
                this.throttle = 500;
                this.selectedItems = new Array();
                this.selectedWidgets = new Map();
                this.overlay = new Controls.ListView(textProvider);
                this.loadingIcon = new Controls.Icon(Controls.IconType.Spinner);
                this.loadingIcon.isSpinning = true;
                this.loadingIcon.style.fontSize = "75%";
                this.loadingIcon.style.display = "none";
                this.overlay.style.minWidth = "300px";
                this.overlay.style.minHeight = "200px";
                this.overlay.style.cursor = "default";
                this.overlay.onChanged.add(evt => this.overlayChanged());
                this.addChild(this.overlay);
                this.addChild(this.loadingIcon);
                const contentContainer = document.createElement("table");
                contentContainer.style.width = "100%";
                this.contentContainerRow = document.createElement("tr");
                contentContainer.appendChild(this.contentContainerRow);
                this.contentNodeCell = document.createElement("td");
                this.contentNodeCell.style.width = "100%";
                this.contentContainerRow.appendChild(this.contentNodeCell);
                const contentNodeCellDiv = document.createElement("div");
                contentNodeCellDiv.style.height = "100%";
                contentNodeCellDiv.style.width = "100%";
                this.contentNodeCell.appendChild(contentNodeCellDiv);
                const loadingIconCell = document.createElement("td");
                const loadingIconDiv = document.createElement("div");
                loadingIconCell.appendChild(loadingIconDiv);
                loadingIconDiv.appendChild(this.loadingIcon.node);
                loadingIconCell.setAttribute("align", "center");
                loadingIconCell.style.verticalAlign = "middle";
                loadingIconCell.style.lineHeight = ".1";
                loadingIconCell.style.paddingRight = "2px";
                this.contentContainerRow.appendChild(loadingIconCell);
                this.contentNode = document.createElement("input");
                this.contentNode.setAttribute("type", "text");
                this.contentNode.style.border = "0px black solid";
                this.contentNode.style.height = "100%";
                this.contentNode.style.width = "100%";
                this.contentNode.style.paddingLeft = "5px";
                this.contentNode.style.outline = "none";
                this.contentNode.addEventListener("keydown", evt => this.onKeyDown(evt));
                this.contentNode.addEventListener("keyup", evt => this.onKeyUp(evt));
                this.contentNode.addEventListener("blur", evt => this.onBlur(evt));
                contentNodeCellDiv.appendChild(this.contentNode);
                this.overlayContainer = document.createElement("div");
                this.overlayContainer.style.position = "absolute";
                this.overlayContainer.style.display = "none";
                this.overlayContainer.appendChild(this.overlay.node);
                // This prevents mouse events from forcing an onblur on the input control.  Basically,
                // we prevent the mousedown from propagating to the input control and so it cannot
                // recognize the loss of focus.
                this.overlayContainer.addEventListener("mousedown", evt => {
                    evt.stopImmediatePropagation();
                    evt.preventDefault();
                });
                const overlayAnchor = document.createElement("div");
                overlayAnchor.style.position = "relative";
                overlayAnchor.appendChild(this.overlayContainer);
                this.node.style.border = "1px solid #999";
                this.node.appendChild(contentContainer);
                this.node.appendChild(overlayAnchor);
            }
            get text() {
                return this.contentNode.value;
            }
            set text(value) {
                this.contentNode.value = value;
            }
            get placeholder() {
                return this.contentNode.getAttribute("placeholder") || "";
            }
            set placeholder(value) {
                this.contentNode.setAttribute("placeholder", value);
            }
            get selectedItem() {
                return this.selectedItems.length > 0 ? this.selectedItems[0] : null;
            }
            set selectedItem(value) {
                if (this.multiselect) {
                    this.clearSelectedItems();
                    if (value) {
                        this.addSelectedItem(value);
                    }
                }
                else {
                    this.selectedItems.length = 0;
                    if (value)
                        this.selectedItems.push(value);
                    this.text = value == null ? "" : this.textProvider(value);
                }
            }
            clearSelectedItems() {
                while (this.selectedItems.length > 0) {
                    this.removeSelectedItem(this.selectedItems[0]);
                }
            }
            addSelectedItem(item) {
                const itemWidget = document.createElement("div");
                itemWidget.style.whiteSpace = "nowrap";
                itemWidget.style.fontSize = "60%";
                itemWidget.style.border = "1px black solid";
                itemWidget.style.borderRadius = "5px";
                itemWidget.style.paddingLeft = "3px";
                itemWidget.style.paddingRight = "3px";
                itemWidget.style.cursor = "default";
                itemWidget.title = "Click to remove";
                itemWidget.addEventListener("click", evt => {
                    this.removeSelectedItem(item);
                    this.contentNode.focus();
                });
                itemWidget.appendChild(document.createTextNode(this.textProvider(item)));
                const itemCell = document.createElement("td");
                itemCell.style.paddingLeft = "2px";
                itemCell.appendChild(itemWidget);
                Weclarative.Utils.Elements.insertBefore(itemCell, this.contentNodeCell);
                this.selectedWidgets.set(item, itemWidget);
                this.selectedItems.push(item);
            }
            removeSelectedItem(item) {
                const itemWidget = this.selectedWidgets.get(item);
                this.selectedWidgets.delete(item);
                Arrays.remove(this.selectedItems, item);
                this.contentContainerRow.removeChild(itemWidget.parentElement);
            }
            dropDown() {
                this.overlayContainer.style.display = "";
            }
            closeUp() {
                this.overlayContainer.style.display = "none";
                this.isResettingOverlay = true;
                this.overlay.selectedItem = null;
                this.isResettingOverlay = false;
            }
            onKeyDown(event) {
                switch (event.keyCode) {
                    case Controls.KeyCode.DownArrow:
                        this.overlay.selectNextItem();
                        event.stopImmediatePropagation();
                        event.preventDefault();
                        break;
                    case Controls.KeyCode.UpArrow:
                        this.overlay.selectPreviousItem();
                        event.stopImmediatePropagation();
                        event.preventDefault();
                        break;
                    case Controls.KeyCode.Escape:
                        this.closeUp();
                        event.stopImmediatePropagation();
                        event.preventDefault();
                        break;
                    case Controls.KeyCode.Enter:
                        this.commit();
                        this.closeUp();
                        event.stopImmediatePropagation();
                        event.preventDefault();
                        break;
                }
            }
            onKeyUp(event) {
                return __awaiter(this, void 0, void 0, function* () {
                    switch (event.keyCode) {
                        case Controls.KeyCode.DownArrow:
                        case Controls.KeyCode.UpArrow:
                        case Controls.KeyCode.Escape:
                        case Controls.KeyCode.Enter:
                        case Controls.KeyCode.Tab:
                        case Controls.KeyCode.LeftArrow:
                        case Controls.KeyCode.RightArrow:
                        case Controls.KeyCode.PageDown:
                        case Controls.KeyCode.PageUp:
                        case Controls.KeyCode.Home:
                        case Controls.KeyCode.End:
                        case Controls.KeyCode.Ctrl:
                        case Controls.KeyCode.Alt:
                        case Controls.KeyCode.Shift:
                            return;
                    }
                    this.loadingIcon.style.display = "inherit";
                    this.keyPressEvent = event;
                    if (this.throttle > 0)
                        yield Weclarative.Utils.Promises.delay(this.throttle);
                    if (this.keyPressEvent == event) {
                        this.loadingIcon.style.display = "inherit";
                        if (this.onSearch != null)
                            this.onSearch(this.contentNode.value, items => this.populateItems(items));
                        this.loadingIcon.style.display = "none";
                    }
                });
            }
            onBlur(event) {
                this.closeUp();
            }
            populateItems(items) {
                this.overlay.clear();
                for (const item of items) {
                    this.overlay.add(item);
                }
                this.dropDown();
            }
            overlayChanged() {
                if (!this.multiselect && !this.isResettingOverlay) {
                    this.selectedItem = this.overlay.selectedItem || null;
                }
            }
            commit() {
                if (this.multiselect) {
                    this.addSelectedItem(this.overlay.selectedItem);
                    this.text = "";
                }
            }
        }
        Controls.AutoCompleteTextBox = AutoCompleteTextBox;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Controls;
    (function (Controls) {
        /**
         * Provides a header that remains fixed when scrolling vertically.
         */
        class FixedHeaderPanel extends Controls.Control {
            constructor() {
                super();
                this.headerNode = document.createElement("div");
                this.headerNode.style.width = "100%";
                this.headerNode.style.position = "fixed";
                this.contentNode = document.createElement("div");
                this.contentNode.style.height = "100%";
                this.node.style.height = "100%";
                this.node.appendChild(this.headerNode);
                this.node.appendChild(this.contentNode);
            }
            get header() {
                return this._header;
            }
            set header(value) {
                if (this.header != null) {
                    this.removeChild(this.header);
                    Weclarative.Utils.Elements.clear(this.headerNode);
                }
                this._header = value;
                if (value != null) {
                    this.headerNode.appendChild(value.node);
                    if (this.isAttachedToDom)
                        this.fixHeight();
                    else {
                        const handler = () => {
                            value.attachedToDom.remove(handler);
                            this.fixHeight();
                        };
                        value.attachedToDom.add(handler);
                    }
                    this.addChild(value);
                }
            }
            fixHeight() {
                const header = this.header;
                this.contentNode.style.paddingTop = header.node.offsetHeight + "px";
            }
            get content() {
                return this._content;
            }
            set content(value) {
                if (this.content != null) {
                    this.removeChild(this.content);
                    Weclarative.Utils.Elements.clear(this.contentNode);
                }
                this._content = value;
                if (value != null) {
                    this.contentNode.appendChild(value.node);
                    this.addChild(value);
                }
            }
        }
        Controls.FixedHeaderPanel = FixedHeaderPanel;
    })(Controls = Weclarative.Controls || (Weclarative.Controls = {}));
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    /**
     * Your standard Controller in the MVC pattern.  This class is responsible for grouping related actions
     * and associating routes with actions.  Actions are represented as methods, and the mapping is registered
     * by implementing the abstract registerRoutes(...) method.
     */
    class Controller {
        initialize(application) {
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
        get path() { }
        /**
         * The applicatio responsible for instantiating this controller.
         * @returns {}
         */
        get application() {
            return this._application;
        }
        get routeEngine() {
            return this.routeEngine;
        }
        execute(action, viewRequest) {
            return __awaiter(this, void 0, void 0, function* () {
                const view = yield this.application.invokeAction(this, action, viewRequest);
                if (view == null)
                    throw new Error("Controller action did not return a view.");
                view.initialize(new Weclarative.ViewContext(this));
                return view;
            });
        }
    }
    Weclarative.Controller = Controller;
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    class ControllerRegistry {
        constructor() {
            this.controllers = new Array();
        }
        register(controller) {
            this.controllers.push(controller);
            return controller;
        }
        registerRoutes(routes) {
            for (const controller of this.controllers) {
                routes.registerController(controller);
            }
        }
        initialize(application) {
            for (const controller of this.controllers) {
                controller.initialize(application);
            }
        }
    }
    Weclarative.ControllerRegistry = ControllerRegistry;
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    class LayoutType {
        constructor(type, factory) {
            this.type = type;
            this.factory = factory;
        }
    }
    Weclarative.LayoutType = LayoutType;
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    class ViewContext {
        constructor(controller) {
            this.controller = controller;
        }
    }
    Weclarative.ViewContext = ViewContext;
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    class ViewRequest {
        /**
         *  Contains the portion of the url after the host/port and before the query string.
         */
        constructor(path, queryString, routeData) {
            this.path = path;
            this.queryString = queryString;
            this.routeData = routeData;
        }
    }
    Weclarative.ViewRequest = ViewRequest;
})(Weclarative || (Weclarative = {}));
var Weclarative;
(function (Weclarative) {
    var Layout = Weclarative.Views.Layout;
    var RouteEngine = Weclarative.Routes.RouteEngine;
    var HtmlControl = Weclarative.Controls.HtmlControl;
    var EventHandler = Weclarative.Utils.EventHandler;
    var Strings = Weclarative.Utils.Strings;
    /**
     * The top-level application responsible for driving the rest of the behavior of your entire application.  In
     * principle, this class could have provided a singleton access to it, but in the interests of keeping
     * dependencies explicit, and to facilitate potential unit-testig, references to the application is always
     * explicit and derived from some contextual object.
     */
    class MvcApplication {
        constructor() {
            this.onBottomBounced = new EventHandler();
            this._body = new HtmlControl(document.getElementsByTagName("body")[0]);
            this._controllerRegistry = new Weclarative.ControllerRegistry();
            MvcApplication.instance = this;
        }
        registerControllers(registry) {
            for (const property of Object.getOwnPropertyNames(this)) {
                const propertyValue = this[property];
                if (propertyValue instanceof Weclarative.Controller) {
                    const controller = propertyValue;
                    registry.register(controller);
                }
            }
        }
        static load(application) {
            window.addEventListener("load", evt => {
                var app = application();
                app.start();
            });
        }
        get view() {
            return this._view;
        }
        get currentUrl() {
            return window.location.pathname + (!Strings.isNullOrEmpty(window.location.search) ? window.location.search : "");
        }
        start() {
            return __awaiter(this, void 0, void 0, function* () {
                this._host = window.location.host;
                this._port = window.location.port;
                this._scheme = window.location.protocol;
                window.addEventListener("popstate", evt => this.onPopState(evt));
                const path = window.location.pathname;
                console.log(path);
                // Populate routeTree
                const routeEngine = new RouteEngine();
                this.registerControllers(this._controllerRegistry);
                this._controllerRegistry.registerRoutes(routeEngine);
                this.routeTree = routeEngine.generateTree();
                this._controllerRegistry.initialize(this);
                this.onStarting();
                this.onStarted();
            });
        }
        onStarting() {
            return Promise.resolve();
        }
        onStarted() {
            return __awaiter(this, void 0, void 0, function* () {
                yield this.open(this.currentUrl, false);
            });
        }
        onPopState(evt) {
            return __awaiter(this, void 0, void 0, function* () {
                // If state is null then it means it's firing on first load, which we never care about
                const path = evt.state;
                if (path != null && path != this.currentPath)
                    yield this.open(path, false);
            });
        }
        open(url, pushState = true) {
            return __awaiter(this, void 0, void 0, function* () {
                const parts = url.split("?");
                const path = parts[0];
                const queryString = parts.length > 1 ? parts[1] : "";
                this.currentPath = path;
                const view = yield this.execute(path, queryString);
                if (pushState)
                    window.history.pushState(url, view.title, url);
                this.openView(view);
                this.onOpen(url);
            });
        }
        openView(view) {
            document.title = view.title;
            if (this.view instanceof Layout && view.layoutType != null) {
                let layout = this.view;
                let container = layout.findLayout(view.layoutType);
                container.addView(view);
            }
            else {
                let rootView = view.getRootView();
                if (rootView.content == null)
                    throw new Error(`View must provide a valid 'Content' property: ${rootView.constructor.name}`);
                rootView.notifyViewAttached();
                this._body.add(rootView.content);
                this._view = rootView;
            }
            if (this.view instanceof Layout) {
                let layout = this._view;
                let sections = view.sections;
                layout.loadSections(sections);
            }
        }
        execute(path, queryString) {
            return __awaiter(this, void 0, void 0, function* () {
                const viewRequest = this.createViewRequest(path, queryString);
                const routeData = this.routeTree.apply(path);
                const controller = routeData.getValue(Weclarative.Routes.RouteData.controllerKey);
                const action = routeData.getValue(Weclarative.Routes.RouteData.actionKey);
                const view = yield controller.execute(action, viewRequest);
                return view;
            });
        }
        createViewRequest(path, queryString) {
            // Create http context
            const queryStringDictionary = new Map();
            const parts = queryString.split("&");
            for (let part of parts) {
                const pair = part.split("=");
                const key = decodeURI(pair[0]);
                const value = decodeURI(pair[1]);
                queryStringDictionary.set(key, value);
            }
            const routeData = this.routeTree.apply(path);
            const request = new Weclarative.ViewRequest(path, queryStringDictionary, routeData);
            return request;
        }
        onOpen(url) {
        }
        invokeAction(controller, action, viewRequest) {
            const parameters = Weclarative.Utils.Reflection.getParameterNames(action);
            const args = new Array(parameters.length);
            for (let i = 0; i < parameters.length; i++) {
                const key = parameters[i];
                let value;
                if (viewRequest.queryString.has(key))
                    value = viewRequest.queryString.get(key);
                else
                    value = viewRequest.routeData.getValue(key);
                args[i] = value;
            }
            // If async
            const result = action.apply(controller, args);
            if (result instanceof Promise) {
                return result;
            }
            else {
                return Promise.resolve(result);
            }
        }
        notifyOnBottomBounced() {
            this.onBottomBounced.trigger();
        }
    }
    Weclarative.MvcApplication = MvcApplication;
})(Weclarative || (Weclarative = {}));
//# sourceMappingURL=weclarative.js.map