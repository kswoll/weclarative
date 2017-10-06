namespace Weclarative.Controls {
    import EventHandler = Utils.EventHandler;

    export class TextBox extends Control {
        private _onChanged: EventHandler<void>;
        private inputElement: HTMLInputElement;

        constructor() {
            super("input");

            this.node.setAttribute("type", "text");
            this.node.addEventListener("change", evt => this.onJsChanged(evt));
            this.inputElement = this.node as HTMLInputElement;
        }

        get type() {
            return (TextBoxType as any)[this.node.getAttribute("type") as string] as TextBoxType;
        }
        set type(value: TextBoxType) {
            this.node.setAttribute("type", TextBoxType[value]);
        }

        get name() {
            return this.node.getAttribute("name");
        }
        set name(value: string | null) {
            if (value)
                this.node.setAttribute("name", value);
            else
                this.node.removeAttribute("name");
        }

        get placeholder() {
            return this.node.getAttribute("placeholder");
        }
        set placeholder(value: string | null) {
            if (value)
                this.node.setAttribute("placeholder", value);
            else
                this.node.removeAttribute("placeholder");
        }

        get maxLength() {
            const maxLength = this.node.getAttribute("maxlength");
            return maxLength ? parseInt(maxLength) : null;
        }
        set maxLength(value: number | null) {
            if (value)
                this.node.setAttribute("maxlength", value.toString());
            else
                this.node.removeAttribute("maxlength");
        }

        get onChanged() {
            if (!this._onChanged)
                this._onChanged = new EventHandler<void>();
            return this._onChanged;
        }

        private onJsChanged(evt: Event) {
            if (this._onChanged)
                (this._onChanged as EventHandler<void>).trigger();
        }

        get text() {
            return this.inputElement.value;
        }
        set text(value: string) {
            this.inputElement.value = value;
        }
    }
}