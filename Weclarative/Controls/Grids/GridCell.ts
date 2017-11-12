namespace Weclarative.Controls.Grids {
    export class GridCell<T> extends Control {
        protected readonly body: HTMLElement;

        private _control: Control | null;

        constructor(readonly column: IGridColumn<T>, tagName?: string) {
            super(tagName || "td");

            this.body = document.createElement("div");
            this.node.appendChild(this.body);

            column.grid.look.styleCell(this.node);
        }

        get cellNode() {
            return this.node as HTMLTableCellElement;
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