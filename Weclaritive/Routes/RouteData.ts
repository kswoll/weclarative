namespace Routes {
    export class RouteData {
        static readonly controllerKey = "@controller";
        static readonly actionKey = "@action";
        static readonly requiredHttpMethodKey = "@requiredHttpMethod";

        private values = new Map<string, any>();

        getValue(key: string): any {
            return this.values.get(key);
        }
        setValue(key: string, value: any) {
            this.values.set(key, value);
        }

        get action(): string
        {
            return this.getValue(RouteData.actionKey) as string;
        }

        get controller(): string
        {
            return this.getValue(RouteData.controllerKey) as string;
        }

        get requiredHttpMethod(): string
        {
            return this.getValue(RouteData.requiredHttpMethodKey) as string;
        }
    }
}