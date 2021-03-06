﻿namespace Weclarative.Routes {
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

        construct(args: any[]) {
            return "";
        }

        toString() {
            return `(default) ${super.toString()}`;
        }
    }
}