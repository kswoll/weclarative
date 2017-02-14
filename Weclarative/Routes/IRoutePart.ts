namespace Routes {
    export interface IRoutePart {
        acceptPath(path: RoutePath, httpMethod: string): boolean;
        processData(path: RoutePath, data: RouteData) : void;
        readonly routeData: Map<string, any>;
    }
}