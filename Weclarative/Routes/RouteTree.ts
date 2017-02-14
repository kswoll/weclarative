namespace Routes {
    export class RouteTree implements IRouteNode {
        rootPaths = new Array<RouteNode>();

        get children() {
            return this.rootPaths;
        }

        apply(path: string, method: string): RouteData {
            path = Strings.chopEnd(path, "/");
            var route = this.findFirstRoute(path, method);
            if (route == null) {
                throw new Error("Could not apply the URL path '" + path + "'.  No route supports this path.");
            }

            var routeData = new RouteData();
            var routePath = new RoutePath(path);

            for (const part of route)
            {
                part.processData(routePath, routeData);
            }

            return routeData;
        }

        private findFirstRoute(path: string, httpMethod: string): IRoutePart[] | null {
            const routePath = new RoutePath(path);
            const route = new RouteBuilder();

            for (const node of this.rootPaths)
            {
                if (this.calculateRoute(routePath, httpMethod, route, node)) {
                    return route.toArray();
                }
            }

            return null;
        }

        private calculateRoute(path: RoutePath, httpMethod: string, route: RouteBuilder, node: RouteNode): boolean {
            return using(path.pin(), _ => {
                return using(route.pin(),
                    pin => {
                        if (node.part.acceptPath(path, httpMethod)) {
                            route.add(node.part);

                            if (node.children.length > 0) {
                                for (const child of node.children) {
                                    if (this.calculateRoute(path, httpMethod, route, child)) {
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

        toString()
        {
            return "(root)";
        }
    }
}