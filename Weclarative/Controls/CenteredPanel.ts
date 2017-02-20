/// <reference path="Control.ts" />

namespace Controls {
    export class CenteredPanel extends Control {
        private _content: Control | null;
        private contentContainer: HTMLElement;

        constructor(content?: Control) {
            super();
            this.content = content || null;
        }

        get content() {
            return this._content;
        }
        set content(value: Control | null) {
            if (this.content != null) {
                this.removeChild(this.content);
                this.content.node.remove();
            }

            this._content = value;

            if (value != null) {
                const childNode = value.node;
                this.contentContainer.appendChild(childNode);
                this.addChild(value);
            }
        }

        createNode() {
            const table = document.createElement("table");
            table.style.width = "100%";
            table.style.height = "100%";
            table.style.borderCollapse = "collapse";

            const row = document.createElement("tr");
            table.appendChild(row);

            const td = document.createElement("td");
            td.setAttribute("align", "center");
            td.style.verticalAlign = "middle";

            this.contentContainer = document.createElement("div");
            td.appendChild(this.contentContainer);

            row.appendChild(td);

            const outerDiv = document.createElement("div");
            outerDiv.style.width = "100%";
            outerDiv.style.height = "100%";
            outerDiv.appendChild(table);

            return outerDiv;
        }
    }
}