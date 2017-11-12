namespace Weclarative.Controls {
    export class XyPanel extends Control {
        private childrenDivs = new Map<Control, HTMLElement>();

        constructor() {
            super("div");


        }

        add(child: Control, x: number, y: number) {
            this.addChild(child);

            const div = document.createElement("div");
            this.childrenDivs.set(child, div);

            div.style.display = "flex";
            div.style.position = "relative";
            this.setPosition(child, x, y);
            child.style.flexGrow = "1";

            div.appendChild(child.node);

            this.node.appendChild(div);
        }

        setPosition(child: Control, x: number, y: number) {
            const div = this.childrenDivs.get(child) as HTMLElement;
            div.style.left = x.toString() + "px";
            div.style.top = y.toString() + "px";
        }
    }
}
