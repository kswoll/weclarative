namespace Controls {
    export class FixedPanel extends Control {
        private _content: Control | null;

        constructor(content: Control, width: number, height: number) {
            super();
            this.style.width = width + "px";
            this.style.height = height + "px";
            this.content = content;
        }

        get content() {
            return this._content;
        }
        set content(value: Control | null) {
            if (this._content != null) {
                this.removeChild(this.content as Control);
                (this.content as Control).node.remove();
            }
            this._content = value;
            if (value != null) {
                this.node.appendChild(value.node);
                (this.content as Control).style.width = "100%";
                (this.content as Control).style.height = "100%";
                this.addChild(value);
            }
        }
    }
}