interface IEventHandler<T> {
    add(handler: { (data?: T): void }): void;
    remove(handler: { (data?: T): void }): void;
}

class EventHandler<T> implements IEventHandler<T> {
    private handlers: { (data?: T): void; }[] = [];

    add(handler: { (data?: T): void}) {
        this.handlers.push(handler);
    }

    remove(handler: { (data?: T): void}) {
        this.handlers = this.handlers.filter(x => x != handler);
    }

    trigger(data?: T) {
        this.handlers.slice(0).forEach(x => x(data));
    }
}