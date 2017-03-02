namespace Weclarative.Controls {
    import EventHandler = Utils.EventHandler;

    export class CheckBox extends Control {
        private _onChanged: EventHandler<void>;

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