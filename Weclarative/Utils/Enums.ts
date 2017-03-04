namespace Weclarative.Utils {
    export class Enums {
        static getNamesAndValues<T extends number>(e: any) {
            return Enums.getNames(e).map(n => ({ name: n, value: e[n] as T }));
        }

        static getNames(e: any) {
            return Enums.getObjectValues(e).filter(v => typeof v === "string") as string[];
        }

        static getValues<T extends number>(e: any) {
            return Enums.getObjectValues(e).filter(v => typeof v === "number") as T[];
        }

        private static getObjectValues(e: any): (number | string)[] {
            return Object.keys(e).map(k => e[k]);
        }
    }
}