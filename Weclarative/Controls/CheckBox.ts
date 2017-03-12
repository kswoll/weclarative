namespace Weclarative.Controls {
    import EventHandler = Utils.EventHandler;

    export class CheckBox extends Control {
        private _onChanged: EventHandler<void>;

        private label: HTMLElement;
        private checkbox: HTMLInputElement;

        constructor(text = "", public value?: any) {
            super("label");

            this.label = document.createElement("span");

            this.checkbox = document.createElement("input");
            this.checkbox.setAttribute("type", "checkbox");
            this.checkbox.addEventListener("change", evt => this.onJsChanged(evt));
            this.node.appendChild(this.checkbox);
            this.node.appendChild(this.label);

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
                this._onChanged = new EventHandler<void>();
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