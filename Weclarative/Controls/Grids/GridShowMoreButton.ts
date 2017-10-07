namespace Weclarative.Controls.Grids {
    export class GridShowMoreButton<T> extends Control {
        public readonly icon = new Icon();

        private _defaultBackgroundColor: string;
        private _highlightBackgroundColor: string;

        constructor(private readonly grid: Grid<T>) {
            super();

            grid.look.styleShowMoreButton(this);

            this.node.appendChild(this.icon.node);

            this.addChild(this.icon);

            this.onMouseDown.add(() => this.mouseDown());
            this.onMouseUp.add(() => this.mouseUp());
            this.onMouseEntered.add(() => this.mouseEntered());
            this.onMouseExited.add(() => this.mouseExited());
        }

        get defaultBackgroundColor() {
            return this._defaultBackgroundColor;
        }
        set defaultBackgroundColor(value: string) {
            this._defaultBackgroundColor = value;
            if (!Control.isMouseDown)
                this.style.backgroundColor = value;
        }

        get highlightBackgroundColor() {
            return this._highlightBackgroundColor;
        }
        set highlightBackgroundColor(value: string) {
            this._highlightBackgroundColor = value;
            if (Control.isMouseDown)
                this.style.backgroundColor = value;
        }

        mouseDown() {
            this.node.style.backgroundColor = this.highlightBackgroundColor;
            document.body.style.userSelect = "none";
        }

        mouseUp() {
            this.node.style.backgroundColor = this.defaultBackgroundColor;
            document.body.style.userSelect = "";
        }

        mouseEntered() {
            if (Control.isMouseDown)
                this.style.backgroundColor = this.highlightBackgroundColor;
        }

        mouseExited() {
            if (Control.isMouseDown)
                this.style.backgroundColor = this.defaultBackgroundColor;
        }
    }
}