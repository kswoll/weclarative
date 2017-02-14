namespace Routes {
    export class RouteNode implements IRouteNode {
        children = Array<RouteNode>();

        constructor(public part: IRoutePart) {
        }

        toString(): string {
            return this.part.toString();
        }
    }
}