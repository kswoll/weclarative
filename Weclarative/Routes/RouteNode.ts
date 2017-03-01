namespace Weclarative.Routes {
    export class RouteNode implements IRouteNode {
        children = Array<RouteNode>();

        constructor(public parent: IRouteNode, public part: IRoutePart) {
        }

        toString(): string {
            return this.part.toString();
        }
    }
}