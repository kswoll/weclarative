namespace Weclarative.Utils {
    export class Strings {
        static chopStart(s: string, prefix: string): string {
            if (s.startsWith(prefix))
                s = s.substring(prefix.length);
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

        static slugToCamelCase(s: string, slug = "_") {
            let result = "";
            let wasSlug = false;
            for (let i = 0; i < s.length; i++) {
                const c = s[i];
                if (c == slug) {
                    wasSlug = true;
                }
                else if (wasSlug) {
                    result += c.toUpperCase();
                    wasSlug = false;
                } else {
                    result += c;
                }
            }
            return result;
        }

        static camelCaseToSlug(s: string, slug = "_") {
            let result = "";
            for (let i = 0; i < s.length; i++) {
                const c = s[i];
                if (Strings.isUpperCase(c)) {
                    result += slug;
                    result += c.toLowerCase();
                } else {
                    result += c;
                }
            }
            return result;
        }

        static decapitalize(s: string) {
            return s[0].toLowerCase() + s.slice(1);
        }

        static capitalize(s: string) {
            return s[0].toUpperCase() + s.slice(1);
        }

        static isUpperCase(s: string) {
            for (let i = 0; i < s.length; i++) {
                const c = s[i];
                const cUpper = c.toUpperCase();
                const cLower = c.toLowerCase();
                const result = c == cUpper && cUpper != cLower;
                if (!result)
                    return false;
            }
            return true;
        }

        static isLowerCase(s: string) {
            for (let i = 0; i < s.length; i++) {
                const c = s[i];
                const cUpper = c.toUpperCase();
                const cLower = c.toLowerCase();
                const result = c == cLower && cUpper != cLower;
                if (!result)
                    return false;
            }
            return true;
        }
    }
}