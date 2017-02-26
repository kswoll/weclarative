namespace Weclarative.Utils {
    export class Convert {
        static to(value: any, type: string): any {
            if (type == "number" && typeof(value) == "string") {
                return Number(value);
            }
            return undefined;
        }
    }
}