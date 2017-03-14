var hljs = (window as any).hljs;

var md = (window as any).markdownit("default", {
    highlight: (str: string, lang: string) => {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (_) {
            }
        }

        return ""; // use external default escaping
    }
});

namespace Weclarative.Controls {
    /**
     * Use to format a block of text as markdown (using markdown-it).  Useful when you have a bunch of static
     * descriptive content, though using it dynamically has many use-cases as well.
     */
    export class MarkDown extends Html {
        private _markdown: string;

        constructor(markdown: string = "", isInline = false) {
            super("", "markdown");
            this.node.style.display = isInline ? "inline" : "block";
            this.markdown = markdown;
        }

        get markdown() {
            return this._markdown;
        }
        set markdown(value: string) {
            this._markdown = value;
            this.html = md.render(value);
        }
    }
}