namespace Weclarative.Controls {
    export class Html extends Control {
        constructor(html: string = "", isInline = true) {
            super(isInline ? "span" : "div");
            this.html = html;
        }

        get html() {
            return this.node.innerHTML;
        }
        set html(value: string) {
            this.node.innerHTML = value;
        }
    }
}