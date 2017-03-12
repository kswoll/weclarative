namespace Weclarative.Controls {
    export class TitledPanel extends Control {
        private _title: Control | null;
        private legend: HTMLElement;
        private contentDiv: HTMLElement;
        private _content: Control | null;

        constructor(title?: string | Control, content?: Control) {
            super();
            if (typeof(title) == typeof(""))
                this.title = new InlineText(title as string);
            else
                this.title = title as Control;

            if (content)
                this.content = content;
        }

        createNode() {
            this.legend = document.createElement("legend");
            this.contentDiv = document.createElement("div");

            const fieldSet = document.createElement("fieldset");
            fieldSet.style.border = "2px threedface groove";
            fieldSet.style.padding = "10px";
            fieldSet.appendChild(this.legend);
            fieldSet.appendChild(this.contentDiv);

            return fieldSet;
        }

        get title() {
            return this._title;
        }
        set title(value: Control | null) {
            if (this.title) {
                this.removeChild(this.title);
                this.legend.removeChild(this.title.node);
            }
            this._title = value;
            if (value) {
                this.legend.appendChild(value.node);
                this.addChild(value);
            }
        }

        get content() {
            return this._content;
        }
        set content(value: Control | null) {
            if (this.content != null) {
                this.removeChild(this.content);
                this.contentDiv.removeChild(this.content.node);
            }
            this._content = value;
            if (value != null) {
                this.contentDiv.appendChild(value.node);
                this.addChild(value);
            }
        }

        get isEnabled() {
            return this.node.getAttribute("disabled") != "true";
        }
        set isEnabled(value: boolean) {
            if (value)
                this.node.removeAttribute("disabled");
            else
                this.node.setAttribute("disabled", "true");
        }
    }
}