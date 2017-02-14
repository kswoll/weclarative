namespace Utils {
    export class Reflection {
        private static STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg;
        private static ARGUMENT_NAMES = /([^\s,]+)/g;

        static getParameterNames(func: Function): string[] {
            const funcAsString = func.toString().replace(Reflection.STRIP_COMMENTS, "");
            let matches = funcAsString.slice(funcAsString.indexOf("(") + 1, funcAsString.indexOf(")")).match(Reflection.ARGUMENT_NAMES);
            let result = new Array<string>();
            if (matches != null) {
                for (let i = 0; i < matches.length; i++) {
                    result.push(matches[i]);
                }
            }
            return result;
        }
    }
}