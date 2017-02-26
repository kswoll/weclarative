namespace Weclarative.Controls {
    /**
     * Provides a header that remains fixed when scrolling vertically.
     */
    export class FixedHeaderPanel extends Control {
        private _header: Control | null;
        private _content: Control | null;
        private headerNode: HTMLElement;
        private contentNode: HTMLElement;

        constructor() {
            super();

            this.headerNode = document.createElement("div");
            this.headerNode.style.width = "100%";
            this.headerNode.style.position = "fixed";

            this.contentNode = document.createElement("div");
            this.contentNode.style.height = "100%";

            this.node.style.height = "100%";
            this.node.appendChild(this.headerNode);
            this.node.appendChild(this.contentNode);
        }

        get header() {
            return this._header;
        }
        set header(value: Control | null) {
            if (this.header != null) {
                this.removeChild(this.header);
                Utils.Elements.clear(this.headerNode);
            }
            this.header = value;
            if (value != null) {
                this.headerNode.appendChild(value.node);
                if (this.isAttachedToDom)
                    this.fixHeight();
                else {
                    const handler = () => {
                        value.attachedToDom.remove(handler);
                        this.fixHeight();
                    };
                    value.attachedToDom.add(handler);
                }
                this.addChild(value);
            }
        }

        fixHeight() {
            const header = this.header as Control;
            this.contentNode.style.paddingTop = header.node.offsetHeight + "px";
        }

        get content() {
            return this._content;
        }
        set content(value: Control | null) {
            if (this.content != null) {
                this.removeChild(this.content);
                Utils.Elements.clear(this.contentNode);
            }
            this.content = value;
            if (value != null) {
                this.contentNode.appendChild(value.node);
                this.addChild(value);
            }
        }
    }
}