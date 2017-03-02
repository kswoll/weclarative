namespace Weclarative.Controls {
    export class ContentPanel extends Control {
        private _content: Control | null;

        constructor(content: Control) {
            super();
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
                this.node.appendChild(value.node);
                this.addChild(value);
            }
        }
    }
}