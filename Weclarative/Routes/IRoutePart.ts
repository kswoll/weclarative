namespace Weclarative.Routes {
    export interface IRoutePart {
        acceptPath(path: RoutePath): boolean;
        processData(path: RoutePath, data: RouteData) : void;
        readonly routeData: Map<string, any>;
    }
}