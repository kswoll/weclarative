namespace Weclarative.Controls {
    export class VerticalPanel extends Control {
        private static readonly animationSpeed = 250;

        private _spacing: number;
        private _horizontalAlignment: HorizontalAlignment;
        private _verticalAlignment: VerticalAlignment;

        constructor(spacing = 0, verticalAlignment = VerticalAlignment.Top, horizontalAlignment = HorizontalAlignment.Fill) {
            super("div");

            this.node.style.display = "flex";
            this.node.style.flexDirection = "column";

            this.spacing = spacing;
            this.verticalAlignment = verticalAlignment;
            this.horizontalAlignment = horizontalAlignment;
        }

        get spacing() {
            return this._spacing;
        }
        set spacing(value: number) {
            this._spacing = value;

            for (let i = 0; i < this.count - 1; i++) {
                const child = this.getChild(i);
                child.style.paddingBottom = value + "px";
            }
        }

        get verticalAlignment() {
            return this._verticalAlignment;
        }
        set verticalAlignment(value: VerticalAlignment) {
            this._verticalAlignment = value;

            const updateFlexGrow = (value: string) => {
                for (let i = 0; i < this.count; i++) {
                    const child = this.getChild(i);
                    const div = child.node.parentElement as HTMLElement;
                    div.style.flexGrow = value;
                }
            };

/*
            for (let i = 0; i < this.count; i++) {
                const child = this.getChild(i);
                const div = child.node.parentElement as HTMLElement;
                if (value == VerticalAlignment.Fill) {
                    div.style.position = "relative";
                    child.style.position = "absolute";
                } else {
                    div.style.position = "inherit";
                    child.style.position = "inherit";
                }
            }
*/
            switch (value) {
                case VerticalAlignment.Fill:
                    this.node.style.justifyContent = "";
                    updateFlexGrow("1");
                    break;
                case VerticalAlignment.Middle:
                    this.node.style.justifyContent = "center";
                    updateFlexGrow("");
                    break;
                case VerticalAlignment.Top:
                    this.node.style.justifyContent = "flex-start";
                    updateFlexGrow("");
                    break;
                case VerticalAlignment.Bottom:
                    this.node.style.justifyContent = "flex-end";
                    updateFlexGrow("");
                    break;
            }
        }

        get horizontalAlignment() {
            return this._horizontalAlignment;
        }
        set horizontalAlignment(value: HorizontalAlignment) {
            this._horizontalAlignment = value;
            switch (value) {
                case HorizontalAlignment.Left:
                    this.node.style.alignItems = "flex-start";
                    break;
                case HorizontalAlignment.Center:
                    this.node.style.alignItems = "center";
                    break;
                case HorizontalAlignment.Right:
                    this.node.style.alignItems = "flex-end";
                    break;
                case HorizontalAlignment.Fill:
                    this.node.style.alignItems = "stretch";
                    break;
            }
        }

        add(child: Control, alignment?: HorizontalAlignment, spaceAbove?: number, animate: boolean = false) {
            this.node.appendChild(this.internalAdd(child, alignment, spaceAbove || 0, animate));
        }

        private internalAdd(child: Control, alignment?: HorizontalAlignment, spaceAbove = 0, animate: boolean = false): HTMLElement {
            if (this.count > 0)
                spaceAbove += this.spacing;
            this.addChild(child);

            const previousChild = this.node.lastElementChild as HTMLElement;
            if (previousChild)
                previousChild.style.paddingBottom = this.spacing + "px";

            const div = document.createElement("div");
            div.style.display = "flex";
            child.style.flexGrow = "1";
/*
            if (this.verticalAlignment == VerticalAlignment.Fill) {                
                div.style.position = "relative";
                child.style.position = "absolute";
            }
*/

            switch (this.verticalAlignment) {
                case VerticalAlignment.Fill:
                    div.style.flexGrow = "1";
                    break;
            }

            if (alignment) {
                const resolvedAlignment = alignment as HorizontalAlignment;
                switch (resolvedAlignment) {
                    case HorizontalAlignment.Left:
                        div.style.alignSelf = "flex-start";
                        break;
                    case HorizontalAlignment.Center:
                        div.style.alignSelf = "center";
                        break;
                    case HorizontalAlignment.Right:
                        div.style.alignSelf = "flex-end";
                        break;
                    case HorizontalAlignment.Fill:
                        div.style.alignSelf = "stretch";
                        break;
                }
            }

            if (spaceAbove != 0) {
                div.style.paddingTop = spaceAbove + "px";
            }

            div.appendChild(child.node);

            if (animate) {
                const height = Utils.Elements.measureOffsetHeight(div);
                div.style.display = "none";
                div.style.overflow = "hidden";
                Utils.Animator.animate(
                    (progress: number) => {
                        const newHeight = Math.floor(height * progress);
                        div.style.height = newHeight + "px";
                        div.style.display = "";
                    },
                    VerticalPanel.animationSpeed,
                    () => {
                        div.style.overflow = "";
                        div.style.height = "";
                    });
            }

            return div;
        }

        insertBefore(child: Control, insertBefore: Control, alignment?: HorizontalAlignment, spaceAbove = 0, animate = false) {
            if (insertBefore.parent != this)
                throw new Error("Cannot use a reference node that is not contained by this control");

            const div = insertBefore.node.parentElement as HTMLElement;

            const childNode = this.internalAdd(child, alignment, spaceAbove, animate);
            this.node.insertBefore(childNode, div);
        }

        insertAfter(child: Control, insertAfter: Control, alignment?: HorizontalAlignment, spaceAbove = 0, animate = false) {
            if (insertAfter.parent != this)
                throw new Error("Cannot use a reference node that is not contained by this control");

            const div = insertAfter.node.parentElement as HTMLElement;

            const childNode = this.internalAdd(child, alignment, spaceAbove, animate);
            Utils.Elements.insertAfter(this.node, childNode, div);
        }

        replace(oldChild: Control, newChild: Control) {
            if (oldChild.parent != this)
                throw new Error("Cannot replace out a child that is not contained by this control");

            (oldChild.node.parentElement as HTMLElement).replaceChild(newChild.node, oldChild.node);
            this.removeChild(oldChild);
            this.addChild(newChild);
        }

        remove(child: Control, animate = false) {
            const div = child.node.parentElement as HTMLElement;

            if (animate) {
                const height = Utils.Elements.measureOffsetHeight(div);
                div.style.overflow = "hidden";
                Utils.Animator.animate(
                    (progress) => {
                        const newHeight = Math.floor(height * (1 - progress));
                        div.style.height = newHeight + "px";
                    },
                    VerticalPanel.animationSpeed,
                    () => {
                        div.style.overflow = "";
                        div.style.height = "";
                        div.removeChild(child.node);
                        this.node.removeChild(div);
                        super.removeChild(child);
                    });
            } else {
                div.removeChild(child.node);
                this.node.removeChild(div);
                super.removeChild(child);
            }
        }

        removeChild(child: Control) {
            this.remove(child);
        }

        removeAll() {
            super.removeAll();
        }
    }
}