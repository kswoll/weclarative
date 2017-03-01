namespace Weclarative.Routes {
    export interface IRouteNode {
        parent: IRouteNode | null;
        children: Array<RouteNode>;
    }
}