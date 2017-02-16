namespace Routes {
    export abstract class RoutePart implements IRoutePart {
        abstract acceptPath(path: RoutePath): boolean;

        protected constructor(readonly routeData: Map<string, any> = new Map<string, any>(), item?: [string, any]) {
            if (item) {
                const [key, value] = item;
                routeData.set(key, value);
            }
        }

        processData(path: RoutePath, data: RouteData) {
            this.consumePath(path);
            for (const key in this.routeData) {
                data.setValue(key, this.routeData.get(key));
            }
        }

        consumePath(path: RoutePath) {
            path.consume();
        }

/*

        toString() {
            return `{ ${this.routeData} }`;
        }

        public override string ToString()
    {
        return "{ " + string.Join(", ", RouteData.Select(x => x.Key + "=" + x.Value)) + " }";
    }
*/
    }
}