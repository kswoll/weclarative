namespace Controls {
    export class LayeredPanel extends Control {
        private container: HTMLElement;
        private _background: Control | null;
        private layers = new Array<Control>();
        private wrappers = new Array<HTMLElement>();
        private cell: HTMLElement;

        constructor() {
            super();
        }

        get background() {
            return this._background;
        }
        set background(value: Control | null) {
            if (this.background != null) {
                this.removeChild(this.background);
                this.background.node.remove();
            }
            this._background = value;
            if (value != null) {
                this.container.appendChild(value.node);
                this.addChild(value);
            }
        }

        addLayer(layer: Control, allowPointerEvents = true) {
            const wrapper = document.createElement("div");
            wrapper.style.position = "absolute";
            wrapper.style.left = "0px";
            wrapper.style.right = "0px";
            wrapper.style.top = "0px";
            wrapper.style.bottom = "0px";
            if (!allowPointerEvents)
                wrapper.style.pointerEvents = "none";
            wrapper.appendChild(layer.node);

            if (this.background != null)
                Elements.insertBefore(wrapper, this.background.node);
            else
                this.container.appendChild(wrapper);

            this.addChild(layer);
            this.layers.push(layer);
            this.wrappers.push(wrapper);
        }

        removeLayer(layer: Control) {
            const index = this.layers.indexOf(layer);
            const wrapper = this.wrappers[index];
            layer.node.remove();
            wrapper.remove();

            this.removeChild(layer);
            Arrays.remove(this.layers, layer);
            Arrays.remove(this.wrappers, wrapper);
        }

        createNode() {
            const table = document.createElement("table");

            const row = document.createElement("tr");
            this.cell = document.createElement("td");
            this.cell.style.verticalAlign = "middle";
            this.cell.style.position = "relative";
            this.cell.style.zIndex = "-1";
            this.container = document.createElement("div");

            this.cell.appendChild(this.container);
            row.appendChild(this.cell);
            table.appendChild(row);

            return table;
        }
    }
}