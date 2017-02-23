namespace Controls {
    export class Button extends Control {
        constructor(text = "") {
            super("input");
            (this.node as HTMLInputElement).type = "button";
            this.text = text;
        }

        get text() {
            return this.node.getAttribute("value") || "";
        }
        set text(value: string) {
            this.node.setAttribute("value", value);
        }
    }
}