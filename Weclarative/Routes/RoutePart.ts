namespace Weclarative.Routes {
    export abstract class RoutePart implements IRoutePart {
        abstract acceptPath(path: RoutePath): boolean;

        private _routeData: Map<string, any>;

        protected constructor() {
            this._routeData = new Map<string, any>();
        }

        get routeData() {
            return this._routeData;
        }

        processData(path: RoutePath, data: RouteData) {
            this.consumePath(path);
            for (const key of this.routeData.keys()) {
                data.setValue(key, this.routeData.get(key));
            }
        }

        consumePath(path: RoutePath) {
            path.consume();
        }

        construct(args: any[]): string { throw new Error("Not implemented"); }


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