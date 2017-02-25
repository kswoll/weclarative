namespace Controls {
    export class TextBlock extends Control {
        constructor(value: string = "") {
            super("div");
            this.value = value;
        }

        get value() {
            return this.node.innerHTML;
        }
        set value(value: string) {
            this.node.innerHTML = value;
        }
    }
}