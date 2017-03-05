namespace Weclarative.Controls {
    /**
     * A panel that lays out its children horizontally in a single row, with control over
     * spacing and alignment.
     */
    export class HorizontalPanel extends Control {
        private static readonly animationSpeed = 250;

        private _spacing: number;
        private _horizontalAlignment: HorizontalAlignment;
        private _verticalAlignment: VerticalAlignment;

        /**
         * Creates a new HorizontalPanel optionally specifying the spacing and alignment.
         * @param spacing The amount of space between each child
         * @param horizontalAlignment How the panel aligns all the children as a whole.
         * @param verticalAlignment The default vertical alignment for each child.  This can be overridden on a
         * per-child basis when a control is being added.
         */
        constructor(spacing = 0, horizontalAlignment = HorizontalAlignment.Left, verticalAlignment = VerticalAlignment.Top) {
            super("div");

            this.node.style.display = "flex";
            this.node.style.flexDirection = "row";

            this.spacing = spacing;
            this.horizontalAlignment = horizontalAlignment;
            this.verticalAlignment = verticalAlignment;
        }

        get spacing() {
            return this._spacing;
        }
        set spacing(value: number) {
            this._spacing = value;

            for (let i = 0; i < this.count - 1; i++) {
                const child = this.getChild(i);
                child.style.paddingRight = value + "px";
            }
        }

        get horizontalAlignment() {
            return this._horizontalAlignment;
        }
        set horizontalAlignment(value: HorizontalAlignment) {
            this._horizontalAlignment = value;

            const updateFlexGrow = (value: string) => {
                for (let i = 0; i < this.count; i++) {
                    const child = this.getChild(i);
                    const div = child.node.parentElement as HTMLElement;
                    div.style.flexGrow = value;
                }                
            };

            switch (value) {
                case HorizontalAlignment.Fill:
                    this.node.style.justifyContent = "";
                    updateFlexGrow("1");
                    break;
                case HorizontalAlignment.Center:
                    this.node.style.justifyContent = "center";
                    updateFlexGrow("");
                    break;
                case HorizontalAlignment.Left:
                    this.node.style.justifyContent = "flex-start";
                    updateFlexGrow("");
                    break;
                case HorizontalAlignment.Right:
                    this.node.style.justifyContent = "flex-end";
                    updateFlexGrow("");
                    break;
            }
        }

        get verticalAlignment() {
            return this._verticalAlignment;
        }
        set verticalAlignment(value: VerticalAlignment) {
            this._verticalAlignment = value;
            switch (value) {
                case VerticalAlignment.Top:
                    this.node.style.alignItems = "flex-start";
                    break;
                case VerticalAlignment.Middle:
                    this.node.style.alignItems = "center";
                    break;
                case VerticalAlignment.Bottom:
                    this.node.style.alignItems = "flex-end";
                    break;
                case VerticalAlignment.Fill:
                    this.node.style.alignItems = "stretch";
                    break;
            }
        }

        /**
         * Append a child to the end of this panel.
         * @param child The child to add
         * @param alignment How the child should be positioned vertically in its slot
         * @param spaceBefore How much space to add (in addition to the spacing set for the entire panel)
         * in front of this child.
         */
        add(child: Control, alignment?: VerticalAlignment, spaceBefore = 0, animate = false) {
            this.addChild(child);

            const previousChild = this.node.lastElementChild as HTMLElement;
            if (previousChild)
                previousChild.style.paddingRight = this.spacing + "px";

            const div = document.createElement("div");
            div.style.display = "flex";
            child.style.flexGrow = "1";

            switch (this.horizontalAlignment) {
                case HorizontalAlignment.Fill:
                    div.style.flexGrow = "1";
                    break;
            }

            if (alignment != undefined) {
                const resolvedAlignment = alignment as VerticalAlignment;
                switch (resolvedAlignment) {
                    case VerticalAlignment.Fill:
                        div.style.alignSelf = "stretch";
                        break;
                    case VerticalAlignment.Top:
                        div.style.alignSelf = "flex-start";
                        break;
                    case VerticalAlignment.Middle:
                        div.style.alignSelf = "center";
                        break;
                    case VerticalAlignment.Bottom:
                        div.style.alignSelf = "flex-end";
                        break;
                }                
            }

            if (spaceBefore != 0) {
                div.style.marginLeft = spaceBefore + "px";
            }

            div.appendChild(child.node);

            if (animate) {
                const width = Utils.Elements.measureOffsetWidth(div);
                div.style.display = "none";
                div.style.overflow = "hidden";
                div.style.whiteSpace = "nowrap";
                Utils.Animator.animate(
                    (progress: number) => {
                        const newWidth = Math.floor(width * progress);
                        div.style.width = newWidth + "px";
                        div.style.display = "";
                    },
                    HorizontalPanel.animationSpeed,
                    () => {
                        div.style.overflow = "";
                        div.style.height = "";
                        div.style.whiteSpace = "inherit";
                    });
            }

            this.node.appendChild(div);
        }

        remove(child: Control) {
            const cell = child.node.parentElement as HTMLElement;
            if (!cell.nextElementSibling) {
                const previousCell = cell.previousElementSibling as HTMLElement;
                previousCell.style.paddingRight = "";
            }

            child.node.remove();
            cell.remove();
            this.removeChild(child);
        }
    }
}