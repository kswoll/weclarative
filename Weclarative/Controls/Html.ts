namespace Controls {
    export class Html extends Control {
        constructor(html: string) {
            super("span");
            this.node.innerHTML = html;
        }
    }
}