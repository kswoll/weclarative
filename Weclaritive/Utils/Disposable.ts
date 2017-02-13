interface IDisposable {
    dispose(): void;
}

function using<T extends IDisposable>(resource: T, action: (resource: T) => void) {
    try {
        action(resource);
    } finally {
        resource.dispose();
    }
}