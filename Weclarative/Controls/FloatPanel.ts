namespace Controls {
    export class FloatPanel extends Control {
        static left(content?: Control) {
            return new FloatPanel(content || null, FloatPanelSide.Left);
        }

        static right(content?: Control) {
            return new FloatPanel(content || null, FloatPanelSide.Right);
        }

        private _content: Control | null;

        private constructor(content: Control | null, side: FloatPanelSide) {
            super("div");

            this.content = content || null;
            this.side = side;
        }

        get side() {
            return this.node.style.cssFloat == "left" ? FloatPanelSide.Left : FloatPanelSide.Right;
        }
        set side(value: FloatPanelSide) {
            this.node.style.cssFloat = value == FloatPanelSide.Left ? "left" : "right";
        }

        get content() {
            return this._content;
        }
        set content(value: Control | null) {
            if (this.content != null) {
                this.content.node.remove();
                this.removeChild(this.content);
            }
            this._content = value;
            if (value != null) {
                this.addChild(value);
                this.node.appendChild(value.node);
            }
        }
    }
}