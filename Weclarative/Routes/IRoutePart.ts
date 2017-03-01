namespace Weclarative.Routes {
    export interface IRoutePart {
        acceptPath(path: RoutePath): boolean;
        processData(path: RoutePath, data: RouteData): void;
        construct(args: Array<any>): string;
        readonly routeData: Map<string, any>;
    }
}