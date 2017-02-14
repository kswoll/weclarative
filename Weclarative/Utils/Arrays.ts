﻿class Arrays {
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
}