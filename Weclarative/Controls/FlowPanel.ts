namespace Weclarative.Controls {
    /**
     * This panel renders its children as a normal series of HTML elements.  If you wish to to
     * align images and other content to the left or right so that content flows around it,
     * you'll need to use this panel in conjunction with FloatPanel.
     */
    export class FlowPanel extends Control {
        constructor() {
            super("div");
            this.node.style.textAlign = "left";
        }

        add(control: Control) {
            this.node.appendChild(control.node);
            this.addChild(control);
        }

        remove(control: Control) {
            this.removeChild(control);
            control.node.remove();
        }

        removeAll() {
            super.removeAll();
        }
    }
}