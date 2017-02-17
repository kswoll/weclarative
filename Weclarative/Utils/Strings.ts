namespace Utils {
    export class Strings {
        static chopStart(s: string, prefix: string): string {
            if (s.startsWith(prefix))
                s = s.substring(0, prefix.length);
            return s;
        }

        static chopEnd(s: string, suffix: string): string {
            if (s.endsWith(suffix))
                s = s.substring(0, s.length - suffix.length);
            return s;
        }

        static isNullOrEmpty(s: string | null): boolean {
            return s == null || s == "";
        }
    }
}