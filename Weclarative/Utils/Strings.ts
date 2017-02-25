namespace Utils {
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
                return c == cUpper && cUpper != cLower;
            }
        }

        static isLowerCase(s: string) {
            for (let i = 0; i < s.length; i++) {
                const c = s[i];
                const cUpper = c.toUpperCase();
                const cLower = c.toLowerCase();
                return c == cLower && cUpper != cLower;
            }
        }

        static camelCaseToSlug(s: string, slug = "_") {
            let result = "";
            for (let i = 0; i < s.length; i++) {
                const c = s[i];
                if (c.)
            }
        }
    }
}
/*
        public static string CamelcaseToSlug(this string s, char slug = '_')
        {
            var builder = new StringBuilder();
            foreach (var c in s)
            {
                if (char.IsUpper(c))
                {
                    builder.Append(slug);
                    builder.Append(char.ToLower(c));
                }
                else
                {
                    builder.Append(c);
                }
            }
            return builder.ToString();
        }
*/