namespace Weclarative.Routes {
    export interface IRouteConstraint {
        accept(path: RoutePath): boolean;
    }
}