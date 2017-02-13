namespace Utils {
    export class Strings {
        static chopStart(s: string, prefix: string): string {
            if (s.startsWith(prefix))
                s = s.substring(0, prefix.length);
            return s;
        }
    }
}