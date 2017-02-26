namespace Weclarative.Utils {
    export interface IDisposable {
        dispose(): void;
    }

    export function using<T extends IDisposable, TResult>(resource: T, action: (resource: T) => TResult) {
        try {
            return action(resource);
        } finally {
            resource.dispose();
        }
    }
}