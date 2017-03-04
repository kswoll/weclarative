namespace Weclarative.Utils {
    export interface IEventHandler<T> {
        add(handler: { (data?: T): void }): void;
        remove(handler: { (data?: T): void }): void;
    }

    export class EventHandler<T> implements IEventHandler<T> {
        private handlers: { (data?: T): void; }[] = [];

        add(handler: { (data: T): void }) {
            this.handlers.push(handler);
        }

        remove(handler: { (data: T): void }) {
            this.handlers = this.handlers.filter(x => x != handler);
        }

        trigger(data?: T) {
            this.handlers.slice(0).forEach(x => x(data));
        }
    }

    export class ProxyEventHandler<T> implements IEventHandler<T> {
        addHandler: (handler: (data?: T) => void) => void;
        removeHandler: (handler: (data?: T) => void) => void;

        constructor(addHandler: (handler: (data?: T) => void) => void, removeHandler: (handler: (data?: T) => void) => void) {
            this.addHandler = addHandler;
            this.removeHandler = removeHandler;
        }

        add(handler: (data?: T) => void) {
            this.addHandler(handler);
        }

        remove(handler: (data?: T) => void) {
            this.removeHandler(handler);
        }
    }
}