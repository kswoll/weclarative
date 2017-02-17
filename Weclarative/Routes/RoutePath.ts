/// <reference path="../Utils/Strings.ts" />

import Strings = Utils.Strings;

class RoutePath {
    private _remaining = new Array<string>();
    private consumed = new Array<string>();
    private pinning = new Array<number>();

    constructor(path: string) {
        path = Strings.chopStart(path, "/");
        if (path != "") {
            const parts = path.split("/");
            parts.reverse();
            for (const part of parts)
            {
                this._remaining.push(part);
            }
        }
    }

    pin(): IDisposable
    {
        this.pinning.push(this.location);
        return new RoutePath.Pinned(this);
    }

    unpin()
    {
        this.resetLocation(this.pinning.pop() as number);
    }

    get location(): number {
        return this.consumed.length;
    }

    resetLocation(location: number)
    {
        if (location > this.consumed.length) {
            throw new Error("Illegal location " + location + ", only " + this.consumed.length + " items in the back stack.");
        }
        while (this.consumed.length > location) {
            this.back();
        }
    }

    any(): boolean
    {
        return this._remaining.length > 0;
    }

    get remaining(): number {
        return this._remaining.length;
    }

    startsWith(routePath: RoutePath): boolean {
        if (routePath._remaining.length > this._remaining.length)
            return false;
        if (Arrays.areEqual(this._remaining.slice(0, routePath._remaining.length), routePath._remaining))
            return true;
        return false;
    }

    get current(): string | null {
        return this._remaining.length > 0 ? this._remaining[this._remaining.length - 1] : null;
    }

    consume(): string {
        const part = this._remaining.pop() as string;
        this.consumed.push(part);
        return part;
    }

    consumeAll(): string {
        var s = "";
        while (this.any()) {
            if (s.length > 0)
                s += "/";
            s += this.consume();
        }
        return s;
    }

    consumePath(path: RoutePath)
    {
        for (var i = 0; i < path._remaining.length; i++)
            this.consume();
    }

    back(): string
    {
        var part = this.consumed.pop() as string;
        this._remaining.push(part);
        return part;
    }

    reset() {
        while (this.consumed.length > 0) {
            const part = this.consumed.pop() as string;
            this._remaining.push(part);
        }
    }

    toString(): string {
        var s = "";
        if (this.consumed.length > 0) {
            s += this.consumed.slice().reverse().join("/");
        }

        if (this._remaining.length > 0) {
            s += `/*${this._remaining[this._remaining.length - 1]}*`;

            if (this._remaining.length > 1) {
                s += "/";
                let [, ...rest] = this._remaining;
                s += rest.join("/");
            }
        }

        return s;
    }

    private static Pinned = class {
        constructor(public path: RoutePath) { }

        dispose() {
            this.path.unpin();
        }
    }
}