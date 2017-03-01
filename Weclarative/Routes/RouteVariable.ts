namespace Weclarative.Routes {
    import Convert = Utils.Convert;

    export class RouteVariable extends RoutePart {
        constructor(readonly isTerminal: boolean, readonly parameter: string, readonly parameterType: string) {
            super();
        }

        acceptPath(path: RoutePath): boolean {
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

        construct(args: any[]) {
            const arg = args.shift();
            return arg.toString();
        }

        toString() {
            return `{${this.parameter}} ${super.toString()}`;
        }
    }
}