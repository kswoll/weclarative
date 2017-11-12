namespace Weclarative.Controls {
    import SimpleEventHandler = Utils.SimpleEventHandler;

    export class CheckBox extends Control {
        private _onChanged: SimpleEventHandler;

        private label: HTMLElement;
        private checkbox: HTMLInputElement;

        constructor(text = "", public value?: any) {
            super("label");

            this.label = document.createElement("span");

            this.checkbox = document.createElement("input");
            this.checkbox.setAttribute("type", "checkbox");
            this.checkbox.addEventListener("change", evt => this.onJsChanged(evt));

            const container = document.createElement("label");
            container.appendChild(this.checkbox);
            container.appendChild(this.label);

            this.node.appendChild(container);

            this.text = text;
            this.value = value;
        }

        get text() {
            return this.label.innerHTML;
        }
        set text(value: string) {
            this.label.innerHTML = value;
        }

        get onChanged() {
            if (!this._onChanged)
                this._onChanged = new SimpleEventHandler();
            return this._onChanged;
        }

        onJsChanged(evt: Event) {
            if (this._onChanged)
                this._onChanged.trigger();
        }

        get isChecked() {
            return this.checkbox.checked;
        }
        set isChecked(value: boolean) {
            this.checkbox.checked = value;
        }
    }
}