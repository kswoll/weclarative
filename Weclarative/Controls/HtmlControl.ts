﻿namespace Weclarative.Controls {
    export class HtmlControl extends Control {
        constructor(node: HTMLElement) {
            super(node);
        }

        add(child: Control) {
            this.node.appendChild(child.node);
            this.addChild(child);
        }

        remove(child: Control) {
            this.removeChild(child);
            child.node.remove();
        }
    }
}