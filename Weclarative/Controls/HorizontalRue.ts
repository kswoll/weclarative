namespace Controls {
    export class HorizontalRule extends Control {
        constructor() {
            super("hr");
        }

        get size() {
            return this.node.hasAttribute("size") ? parseInt(this.node.getAttribute("size") as string) : 1;
        }
        set size(value: number) {
            this.node.setAttribute("size", value.toString());
        }
    }
}