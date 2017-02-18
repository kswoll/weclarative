/// <reference path="../Utils/Convert.ts" />

import Convert = Utils.Convert;

namespace Routes {
    export class RouteVariable extends RoutePart {
        constraints = Array<IRouteConstraint>();

        constructor(readonly isTerminal: boolean, readonly parameter: string, readonly parameterType: string) {
            super();
        }

        acceptPath(path: RoutePath): boolean {
            for (const constraint of this.constraints) {
                if (!constraint.accept(path))
                    return false;
            }
            if (path.current != null) {
                path.consume();
                return true;
            }
            return false;
        }

        consumePath(path: RoutePath) {
            // Prevent default consume since we're going to consume it ourselves below
        }

        processData(path: RoutePath, data: RouteData) {
            super.processData(path, data);

            let part = path.consume();
            part = decodeURI(part);
            const value = Convert.to(part, this.parameterType);
            data.setValue(this.parameter, value);
        }

        toString() {
            return `{${this.parameter}} ${super.toString()}`;
        }
    }
}