namespace Weclarative.Routes {
    import Strings = Utils.Strings;
    import using = Utils.using;

    export class RouteTree implements IRouteNode {
        rootPaths = new Array<RouteNode>();

        get children() {
            return this.rootPaths;
        }

        apply(path: string): RouteData {
            path = Strings.chopEnd(path, "/");
            const route = this.findFirstRoute(path);
            if (route == null) {
                throw new Error(`Could not apply the URL path '${path}'.  No route supports this path.`);
            }

            const routeData = new RouteData();
            const routePath = new RoutePath(path);

            for (const part of route)
            {
                part.processData(routePath, routeData);
            }

            return routeData;
        }

        private findFirstRoute(path: string): IRoutePart[] | null {
            const routePath = new RoutePath(path);
            const route = new RouteBuilder();

            for (const node of this.rootPaths)
            {
                if (this.calculateRoute(routePath, route, node)) {
                    return route.toArray();
                }
            }

            return null;
        }

        private calculateRoute(path: RoutePath, route: RouteBuilder, node: RouteNode): boolean {
            return using(path.pin(), _ => {
                return using(route.pin(),
                    pin => {
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

        toString()
        {
            return "(root)";
        }
    }
}