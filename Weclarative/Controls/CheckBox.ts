/// <reference path="Control.ts" />

namespace Controls {
    export class CheckBox extends Control {
        public readonly onChanged = new EventHandler<void>();

        private label: HTMLElement;
        private checkbox: HTMLElement;

        constructor(text = "") {
            super();
            this.text = text;
        }

        get text() {
            return this.label.innerHTML;
        }
        set text(value: string) {
            this.label.innerHTML = value;
        }

        createNode() {
            this.label = document.createElement("span");

            const span = document.createElement("span");
            this.checkbox = document.createElement("input");
            this.checkbox.setAttribute("type", "checkbox");
            this.checkbox.addEventListener("change", this.onJsChanged);
            span.appendChild(this.checkbox);
            span.appendChild(this.label);

            return span;
        }

        onJsChanged(evt: Event) {
            if (this.onChanged != null)
                this.onChanged.trigger();
        }

        get isChecked() {
            return this.checkbox.hasAttribute("checked");
        }
        set isChecked(value: boolean) {
            if (value)
                this.checkbox.setAttribute("checked", "checked");
            else
                this.checkbox.removeAttribute("checked");
        }
    }
}