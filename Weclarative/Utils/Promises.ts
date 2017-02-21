namespace Utils {
    export class Promises {
        static delay(timeout: number) {
            const promise = new Promise((resolve) => {
                window.setTimeout(() => resolve(), timeout);
            });
            return promise;
        }
    }
}