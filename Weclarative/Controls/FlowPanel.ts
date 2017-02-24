namespace Controls {
    /**
     * This panel renders its children as a normal series of HTML elements.  If you wish to to
     * align images and other content to the left or right so that content flows around it,
     * you'll need to use this panel in conjunction with AlignPanel.
     */
    export class FlowPanel extends Control {
        constructor() {
            super("span");
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