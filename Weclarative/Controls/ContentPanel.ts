namespace Weclarative.Controls {
    export class ContentPanel extends Control {
        private _content: Control | null;
        private row: HTMLElement;
        private cell: HTMLElement;

        constructor(content: Control) {
            super("table");
            this.row = document.createElement("tr");
            this.cell = document.createElement("td");
            this.node.appendChild(this.row);
            this.row.appendChild(this.cell);

            this.content = content;
        }

        get content() {
            return this._content;
        }
        set content(value: Control | null) {
            if (this.content) {
                this.content.node.remove();
                this.removeChild(this.content);
            }
            this._content = value;
            if (value) {
                this.cell.appendChild(value.node);
                this.addChild(value);
            }
        }
    }
}