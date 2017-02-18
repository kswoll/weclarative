namespace Controls {
    export class HtmlControl extends Control {
        constructor(node: Element) {
            super(null, node);
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