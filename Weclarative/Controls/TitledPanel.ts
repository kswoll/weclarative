namespace Controls {
    export class TitledPanel extends Control {
        private legend: Element;
        private contentDiv: Element;
        private _content: Control | null;

        constructor(title = "") {
            super();
            this.title = title;
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
            return this.legend.innerHTML;
        }
        set title(value: string) {
            this.legend.innerHTML = value;
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
    }
}