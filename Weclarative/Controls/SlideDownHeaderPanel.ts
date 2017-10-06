namespace Weclarative.Controls {
    /**
     * Establishes a header that can be populated with arbitrary content and that can
     * animate downwards when content is populated and animate upward when content is
     * cleared.  This is useful for showing validation failures.
     */
    export class SlideDownHeaderPanel extends Control {
        private static readonly duration = 300; // milliseconds

        private headerDiv: HTMLElement;
        private headerContainerDiv: HTMLElement;
        private contentDiv: Element;
        private _header: Control | null;
        private _content: Control | null;

        constructor() {
            super();

            this.headerDiv = document.createElement("div");
            this.headerDiv.style.position = "absolute";
            this.headerDiv.style.width = "100%";

            this.headerContainerDiv = document.createElement("div");
            this.headerContainerDiv.style.position = "relative";
            this.headerContainerDiv.style.overflow = "hidden";
            this.headerContainerDiv.style.zIndex = "-1";
            this.headerContainerDiv.appendChild(this.headerDiv);

            this.contentDiv = document.createElement("div");

            this.node.appendChild(this.headerContainerDiv);
            this.node.appendChild(this.contentDiv);
        }

        get header() {
            return this._header;
        }
        set header(value: Control | null) {
            if (this.header != null) {
                this.slideUp();
                this.headerDiv.removeChild(this.header.node);
                this.removeChild(this.header);
            }
            this._header = value;
            if (value != null) {
                this.headerDiv.appendChild(value.node);
                this.addChild(value);
                this.slideDown();
            }
        }

        get content() {
            return this._content;
        }
        set content(value: Control | null) {
            if (this.content != null) {
                this.contentDiv.removeChild(this.content.node);
                this.removeChild(this.content);
            }
            this._content = value;
            if (value != null) {
                this.contentDiv.appendChild(value.node);
                this.addChild(value);
            }
        }

        slideUp() {
            this.headerDiv.style.position = "absolute";
            this.headerContainerDiv.style.height = "0px";
        }

        slideDown() {
            const height = this.headerDiv.offsetHeight;
            this.headerDiv.style.top = -height + "px";
            this.headerDiv.style.position = "absolute";

            Utils.Animator.animate(
                progress => {
                    const newHeight = Math.min(progress * height, height);
                    this.headerDiv.style.top = (-height + newHeight) + "px";
                    this.headerContainerDiv.style.height = newHeight + "px";
                },
                SlideDownHeaderPanel.duration,
                () => {
                    // Reset the style so that it fits into the normal HTML flow.  This ensure that,
                    // after animating, the slid-down content will resize, refit its contents, etc.
                    // if the window resizes.
                    this.headerDiv.style.position = "relative";
                    this.headerContainerDiv.style.height = "inherit";
                });
        }
    }
}