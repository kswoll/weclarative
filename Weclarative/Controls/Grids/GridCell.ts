namespace Weclarative.Controls.Grids {
    export class GridCell extends Control {
        protected readonly body: HTMLElement;

        private _control: Control | null;

        constructor(column: IGridColumn, tagName?: string) {
            super(tagName || "td");

            this.body = document.createElement("div");
            this.node.appendChild(this.body);

            this.style.fontSize = "80%";
            this.style.padding = "4px";
        }

        get content() {
            return this._control;
        }
        set content(value: Control | null) {
            if (this.content) {
                this.removeChild(this.content);
                this.content.node.remove();
            }
            this._control = value;
            if (value) {
                this.addChild(value);
                this.body.appendChild(value.node);
            }
        }
    }
}