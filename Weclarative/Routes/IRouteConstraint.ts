namespace Routes {
    export interface IRouteConstraint {
        accept(path: RoutePath): boolean;
    }
}