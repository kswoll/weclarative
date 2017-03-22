namespace Weclarative.Controls.Grids {
    export class GridShowMoreButton<T> extends Control {
        private readonly downArrow = new Icon(IconType.AngleDoubleDown);
        private _defaultBackgroundColor = "#DDECF7";
        private _highlightBackgroundColor = "#326993";

        constructor(private readonly grid: Grid<T>) {
            super();

            this.style.textAlign = "center";
            this.style.backgroundColor = this.defaultBackgroundColor;
            this.style.border = "1px black solid";
            this.style.borderBottomLeftRadius = "3px";
            this.style.borderBottomRightRadius = "3px";
            this.style.userSelect = "none";
            this.node.appendChild(this.node);

            this.addChild(this.downArrow);

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