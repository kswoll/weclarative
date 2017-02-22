namespace Controls {
    export class TextBox extends Control {
        private onChanged: IEventHandler<void>;
        private inputElement: HTMLInputElement;

        constructor() {
            super();
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

        createNode() {
            const textBox = document.createElement("input");
            textBox.setAttribute("type", "text");
            textBox.addEventListener("change", evt => this.onJsChanged(evt));
            this.inputElement = textBox;
            return textBox;
        }

        private onJsChanged(evt: Event) {
            if (this.onChanged)
                (this.onChanged as EventHandler<void>).trigger();
        }

        get text() {
            return this.inputElement.value;
        }
        set text(value: string) {
            this.inputElement.value = value;
        }
    }
}