namespace Routes {
    class RouteNode implements IRouteNode {
        children: RouteNode[] = new RouteNode[];

        constructor(public part: IRoutePart) {
        }

        public override string ToString() {
            return Part.ToString();
        }
    }
}