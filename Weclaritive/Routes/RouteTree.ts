namespace Routes {
    class RouteTree implements IRouteNode {
        RouteNode[] rootPaths = new RouteNode[0];

        apply(path: string, method: string): RouteData {
            path = path.ChopEnd("/");
            var routePath = new RoutePath(path.ToLower());
            var route = this.calculateRoute(path, method);
            if (route == null) {
                throw new InvalidOperationException("Could not apply the URL path '" + path + "'.  No route supports this path.");
            }

            var routeData = new RouteData();
            routePath = new RoutePath(path);

            for (const part of route)
            {
                part.ProcessData(routePath, routeData);
            }

            return routeData;
        }

        private calculateRoute(path: string, httpMethod: string): IRoutePart[] | null {
            const routePath = new RoutePath(path);
            const route = new RouteBuilder();

            for (const node of this.rootPaths)
            {
                if (this.calculateRoute(routePath, httpMethod, route, node)) {
                    return route.ToArray();
                }
            }

            return null;
        }

        private calculateRoute(path: RoutePath, httpMethod: string, route: RouteBuilder, node: RouteNode) {            
            using(path.Pin())
            using(var pin = route.Pin())
                {
                    if (node.Part.AcceptPath(path, httpMethod))
                {
                        route.Add(node.Part);

                        if (node.Children.Any()) {
                            foreach(var child in node.Children)
                            {
                                if (CalculateRoute(path, httpMethod, route, child)) {
                                    pin.Accept();
                                    return true;
                                }
                            }
                        }
                        else if (!path.Any()) {
                            pin.Accept();
                            return true;
                        }
                    }
                return false;
        }

        public override string ToString()
{
    return "(root)";
}

}
}