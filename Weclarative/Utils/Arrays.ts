namespace Weclarative.Utils {
    export class Arrays {
        static areEqual<T>(array1: T[], array2: T[]): boolean {
            if (array1.length != array2.length)
                return false;
            for (let i = 0; i < array1.length; i++) {
                const o1 = array1[i];
                const o2 = array2[i];
                if ((o1 == null && o2 != null) || (o1 != null && o2 == null))
                    return false;
                if (o1 != o2)
                    return false;
            }
            return true;
        }

        static find<T>(array: Array<T>, predicate: (x: T) => boolean): T | null {
            for (const item of array) {
                if (predicate(item))
                    return item;
            }
            return null;
        }

        static toMap<T, TKey, TValue>(array: Array<T>, getKey: (item: T) => TKey, getValue: (item: T) => TValue) {
            const map = new Map<TKey, TValue>();
            for (const item of array) {
                map.set(getKey(item), getValue(item));
            }
            return map;
        }

        static remove<T>(array: Array<T>, element: T) {
            const index = array.indexOf(element);
            if (index != -1)
                array.splice(index, 1);
        }

        static removeAt<T>(array: Array<T>, index: number) {
            if (index != -1)
                array.splice(index, 1);
        }
    }
}