import Reflection = Utils.Reflection;

namespace Routes {
    export class RouteEngine {
        routeTree = new RouteTree();

        registerController(controller: Controller): void {
            const route = controller.path;
            const routePath = new RoutePath(route);

            let currentNode = this.routeTree as IRouteNode;
            const leafNodes = new Array<RouteNode>();

            do {
                let nextNode: RouteNode | null = null;
                if (routePath.current != null) {
                    const routePart = routePath.consume();
                    const part = new RouteLiteral(routePart, true);
                    nextNode = new RouteNode(part);
                    this.addNode(currentNode, nextNode as RouteNode);

                    if (routePath.current == null) {
                        part.routeData.set(RouteData.controllerKey, controller);
                        leafNodes.push(nextNode as RouteNode);
                    }
                }

                // If defined as a default route, then we don't require the last path part
/*
                if (routePath.current == null && isDefault) {
                    const defaultNode = new RouteNode(new RouteDefault());
                    this.addNode(currentNode, defaultNode);
                    leafNodes.push(defaultNode);
                }
*/
                if (nextNode != null) {
                    currentNode = nextNode;
                }
            }
            while (routePath.current != null);

            controller.registerRoutes((routes, action) => this.add(controller, leafNodes, routes, action));
        }

        add(controller: Controller, parentNodes: Array<RouteNode>, route: string, action: Function, isDefault?: boolean): void {
            let addToRoot = false;
            if (route.startsWith("/")) {
                addToRoot = true;
            }
            const effectiveNodes = addToRoot ? [this.routeTree as IRouteNode] : parentNodes;
            for (const node of effectiveNodes) {
                const routePath = new RoutePath(route);
                let currentNode: IRouteNode | null = node;
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
                        }

                        nextNode = this.addNode(currentNode as IRouteNode, nextNode as RouteNode);
                    }
                    if (routePath.current == null) {
                        
                    }
                    currentNode = nextNode;
                }
                while (routePath.current != null);
            }
        }

/*
                    }
                    if (routePath.Current == null)
                    {
                        if (actionMethod.IsDefined(typeof(DefaultAttribute), false))
                            AddNode(currentNode, new RouteNode(new RouteDefault(RouteData.ActionKey, actionMethod)));
                    }

                    currentNode = nextNode;
                }
                while (routePath.Current != null);
            }


        */
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