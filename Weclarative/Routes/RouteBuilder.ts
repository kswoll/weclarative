namespace Routes {
    export class RouteBuilder {
        private parts = Array<IRoutePart>();
        private pinning = new Array<number>();

        pin(): RouteBuilder.Pinned {
            this.pinning.push(this.parts.length);
            return new RouteBuilder.Pinned(this);
        }

        unpin() {
            const pin = this.pinning.pop();
            while (this.parts.length > pin) {
                this.parts.splice(this.parts.length - 1, 1);
            }
        }

        toArray() {
            return this.parts.slice();
        }

        add(part: IRoutePart) {
            this.parts.push(part);
        }
    }

    export namespace RouteBuilder {
        export class Pinned implements IDisposable {
            private builder: RouteBuilder;
            private accepted: boolean;

            constructor(builder: RouteBuilder) {
                this.builder = builder;
            }

            accept() {
                this.accepted = true;
            }

            dispose() {
                if (!this.accepted)
                    this.builder.unpin();
            }
        }
    }
}