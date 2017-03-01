namespace Weclarative.Routes {
    export interface IRouteNode {
        part: IRoutePart | null;
        parent: IRouteNode | null;
        children: Array<RouteNode>;
    }
}