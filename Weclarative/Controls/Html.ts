namespace Weclarative.Controls {
    export class Html extends Control {
        constructor(html: string = "", tag: string = "span") {
            super(tag);
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