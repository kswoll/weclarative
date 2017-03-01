// <reference path="RoutePart.ts" />

namespace Weclarative.Routes {
    export class RouteLiteral extends RoutePart {
        constructor(readonly literal: string, readonly isTerminal: boolean) {
            super();
            this.literal = literal.toLowerCase();
        }

        acceptPath(path: RoutePath): boolean {
             if (path.current != null && path.current.toLowerCase() == this.literal) {
                 path.consume();
                 return true;
             } else {
                 return false;
             }
        }

        construct(args: any[]) {
            return this.literal;
        }

        toString() {
            return this.literal + " " + super.toString();
        }
    }    
}