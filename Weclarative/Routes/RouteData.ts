namespace Routes {
    export class RouteData {
        static readonly controllerKey = "@controller";
        static readonly actionKey = "@action";

        private values = new Map<string, any>();

        getValue(key: string): any {
            return this.values.get(key);
        }
        setValue(key: string, value: any) {
            this.values.set(key, value);
        }

        get action(): Function
        {
            return this.getValue(RouteData.actionKey) as Function;
        }

        get controller(): string
        {
            return this.getValue(RouteData.controllerKey) as string;
        }
    }
}