namespace Routes {
    class IRoutePart {
        acceptPath(path: RoutePath, httpMethod: string): boolean;
        processData(path: RoutePath, data: RouteData);
        readonly Map<string, object> routeData;
    }    
}