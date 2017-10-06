namespace Weclarative.Controls {
    /**
     * Renders the content by setting width/height at 100% so that it fills inside the parent element
     */
    export class FillPanel extends Control {
        private _content: Control | null;

        constructor(content?: Control) {
            super();

            this.node.style.display = "flex";
            this.node.style.flexDirection = "column";
            this.node.style.alignItems = "stretch";

            if (content)
                this.content = content;
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
                childNode.style.flexGrow = "1";
                this.node.appendChild(childNode);
                this.addChild(value);
            }
        }
    }
}