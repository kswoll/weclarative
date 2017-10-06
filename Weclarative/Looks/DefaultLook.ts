namespace Weclarative.Looks {
    export class DefaultLook {
        private static looks = new Map<string, Look>();
        private static defaultLook = new Look();

        static register(type: string, look: Look) {
            DefaultLook.looks.set(type, look);
        }

        static get(type: string) {
            return DefaultLook.looks.get(type) || DefaultLook.defaultLook;
        }
    }
}
