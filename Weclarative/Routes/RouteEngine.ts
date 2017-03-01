namespace Weclarative.Routes {
    import Strings = Utils.Strings;
    import Arrays = Utils.Arrays;

    export class RouteEngine {
        routeTree = new RouteTree();

        registerController(controller: Controller): void {
            const route = controller.path;
            const routePath = new RoutePath(route);

            let currentNode = this.routeTree as IRouteNode;
            let parentNode = this.routeTree as IRouteNode;

            do {
                let nextNode: RouteNode | null = null;
                if (routePath.current != null) {
                    const routePart = routePath.consume();
                    const part = new RouteLiteral(routePart, true);
                    nextNode = new RouteNode(currentNode, part);
                    this.addNode(currentNode, nextNode as RouteNode);

                    if (routePath.current == null) {
                        part.routeData.set(RouteData.controllerKey, controller);
                        parentNode = nextNode as RouteNode;
                    }
                }
                if (nextNode != null) {
                    currentNode = nextNode;
                }
            }
            while (routePath.current != null);

            controller.registerRoutes((routes, action) => this.add(controller, parentNode, routes, action));
        }

        add(controller: Controller, parentNode: IRouteNode, route: string, action: Function, isDefault?: boolean): void {
            let addToRoot = false;
            if (route.startsWith("/")) {
                addToRoot = true;
            }
            (action as any).$route = route;
            (action as any).$controller = controller;
            const routePath = new RoutePath(route);
            let currentNode: IRouteNode | null = parentNode;
            do {
                let nextNode: RouteNode | null = null;
                if (routePath.current != null) {
                    const part = routePath.consume();

                    let routePart: RoutePart;
                    if (part.startsWith("{") && part.endsWith("}")) {
                        const pieces = Strings.chopEnd(Strings.chopStart(part, "{"), "}").trim().split(":");
                        const [name, type] = pieces;
                        const variable = new RouteVariable(routePath.current == null, name, type);
                        routePart = variable;
                    } else {
                        routePart = new RouteLiteral(part, routePath.current == null);
                    }

                    nextNode = new RouteNode(routePart);

                    if (routePath.current == null) {
                        routePart.routeData.set(RouteData.actionKey, action);
                        routePart.routeData.set(RouteData.controllerKey, controller);
                        (action as any).$route = nextNode;
                    }

                    nextNode = this.addNode(currentNode as IRouteNode, nextNode as RouteNode);
                }
                if (routePath.current == null && route == "") {
                    const defaultRoute = new RouteDefault();
                    defaultRoute.routeData.set(RouteData.actionKey, action);
                    defaultRoute.routeData.set(RouteData.controllerKey, controller);
                    const defaultNode = new RouteNode(defaultRoute);
                    this.addNode(currentNode as IRouteNode, defaultNode);
                }
                currentNode = nextNode;
            }
            while (routePath.current != null);
        }

        addNode(parent: IRouteNode, child: RouteNode): RouteNode {
            if (child.part instanceof RouteLiteral && !child.part.isTerminal) {
                const routeLiteral = child.part;
                const commonChild = Arrays.find(parent.children, x => x.part instanceof RouteLiteral && x.part.literal == routeLiteral.literal && !x.part.isTerminal);
                if (commonChild != null)
                    return commonChild;
            }

            if (child.part instanceof RouteVariable) {
                const routeVariable = child.part;
                if (!routeVariable.isTerminal) {
                    const commonChild = Arrays.find(parent.children, x => x.part instanceof RouteVariable && !x.part.isTerminal);
                    if (commonChild != null)
                        return commonChild;
                }
            }

            if (child.part instanceof RouteLiteral)
                parent.children.unshift(child);
            else
                parent.children.push(child);

            return child;
        }

        generateTree(): RouteTree {
            return this.routeTree;
        }
    }
}