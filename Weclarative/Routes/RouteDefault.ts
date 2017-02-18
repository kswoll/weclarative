/// <reference path="RoutePart.ts" />

namespace Routes {
    export class RouteDefault extends RoutePart {
        constructor() {
            super();
        }

        acceptPath(path: RoutePath): boolean {
            // We only want to apply default routes if there's nothing left in the path
            return path.current == null;
        }

        consumePath(path: RoutePath) {
        }

        toString() {
            return `(default) ${super.toString()}`;
        }
    }
}