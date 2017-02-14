interface IDisposable {
    dispose(): void;
}

function using<T extends IDisposable, TResult>(resource: T, action: (resource: T) => TResult) {
    try {
        return action(resource);
    } finally {
        resource.dispose();
    }
}