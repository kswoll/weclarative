﻿namespace Weclarative.Controls {
    export class FixedPanel extends Control {
        private _content: Control | null;

        constructor(content: Control, width: string, height: string) {
            super();
            this.style.width = width;
            this.style.height = height;
            this.content = content;
        }

        get content() {
            return this._content;
        }
        set content(value: Control | null) {
            if (this._content) {
                this.removeChild(this.content as Control);
                (this.content as Control).node.remove();
            }
            this._content = value;
            if (value) {
                this.node.appendChild(value.node);
                value.style.width = "100%";
                value.style.height = "100%";
                this.addChild(value);
            }
        }
    }
}