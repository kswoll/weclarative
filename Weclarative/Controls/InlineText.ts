namespace Weclarative.Controls {
    export class InlineText extends Control {
        constructor(value: string = "") {
            super("span");
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