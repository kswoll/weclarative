namespace Weclarative.Controls {
    import EventHandler = Utils.EventHandler;

    export class RadioButton extends Control {
        readonly element: HTMLInputElement;

        private _onChanged: EventHandler<RadioButton>;
        private label: HTMLElement;

        constructor(public value?: any, group?: RadioGroup, text?: string) {
            super("label");

            this.label = document.createElement("span");

            this.element = document.createElement("input");
            this.element.setAttribute("type", "radio");
            this.element.addEventListener("change", evt => this.onJsChanged(evt));

            const container = document.createElement("label");
            container.appendChild(this.element);
            container.appendChild(this.label);

            this.node.appendChild(container);

            if (group)
                group.add(this);
            if (text)
                this.text = text;
        }

        get text() {
            return this.label.innerHTML;
        }
        set text(value: string) {
            this.label.innerHTML = value;
        }

        get onChanged() {
            if (!this._onChanged)
                this._onChanged = new EventHandler<RadioButton>();
            return this._onChanged;
        }

        onJsChanged(evt: Event) {
            if (this._onChanged)
                this._onChanged.trigger(this);
        }

        get isChecked() {
            return this.element.checked;
        }
        set isChecked(value: boolean) {
            this.element.checked = value;
        }
    }
}