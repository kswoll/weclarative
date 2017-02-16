namespace Routes {
    export class RouteEngine {
        routeTree = new RouteTree();
        controller: Controller;

        add(route: string, func: Function): void {
            const routePath = new RoutePath(route);

            let currentNode = this.routeTree as IRouteNode;
            const leafNodes = new Array<RouteNode>();

            do {
                let nextNode: RouteNode | null = null;
                if (routePath.current != null) {
                    const routePart = routePath.consume();
                    const part = new RouteLiteral(routePart, true);
                    nextNode = new RouteNode(part);
                    this.addNode(currentNode, nextNode);

                    if (routePath.current == null) {
                        part.routeData.set(RouteData.controllerKey, controller)
                    }
                }
            }
            while (routePath.current != null);
        }

        generateTree(): RouteTree {
            return this.routeTree;
        }
    }
}