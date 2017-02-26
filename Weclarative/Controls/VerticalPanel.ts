namespace Weclarative.Controls {
    export class VerticalPanel extends Control {
        private static readonly animationSpeed = 250;

        private table: HTMLElement;
        private firstSpacer: Element | null;
        private lastSpacer: Element | null;
        private _spacing: number;
        private _verticalAlignment: VerticalAlignment;

        constructor(public defaultAlignment: HorizontalAlignment = HorizontalAlignment.Fill) {
            super();
        }

        get verticalAlignment() {
            if (this.firstSpacer == null && this.lastSpacer == null)
                return VerticalAlignment.Fill;
            else if (this.firstSpacer != null && this.lastSpacer != null)
                return VerticalAlignment.Middle;
            else if (this.firstSpacer != null)
                return VerticalAlignment.Bottom;
            else if (this.lastSpacer != null)
                return VerticalAlignment.Top;
            else
                throw new Error();
        }

        set verticalAlignment(value: VerticalAlignment) {
            if (this.firstSpacer != null) {
                this.firstSpacer.remove();
                this.firstSpacer = null;
            }
            if (this.lastSpacer != null) {
                this.lastSpacer.remove();
                this.lastSpacer = null;
            }
            switch (value) {
                case VerticalAlignment.Fill:
                    break;
                case VerticalAlignment.Middle:
                    this.firstSpacer = document.createElement("tr");
                    const middleFirstSpacerCell = document.createElement("td");
                    middleFirstSpacerCell.style.height = "50%";
                    (this.firstSpacer as Element).appendChild(middleFirstSpacerCell);
                    this.table.insertBefore(this.firstSpacer as Element, this.table.firstChild);

                    this.lastSpacer = document.createElement("tr");
                    const middleLastSpacerCell = document.createElement("td");
                    middleLastSpacerCell.style.height = "50%";
                    (this.lastSpacer as Element).appendChild(middleLastSpacerCell);
                    this.table.appendChild(middleLastSpacerCell);

                    break;
                case VerticalAlignment.Top:
                    this.lastSpacer = document.createElement("tr");
                    const topLastSpacerCell = document.createElement("td");
                    topLastSpacerCell.style.height = "100%";
                    (this.lastSpacer as Element).appendChild(topLastSpacerCell);
                    this.table.appendChild(this.lastSpacer as Element);

                    break;
                case VerticalAlignment.Bottom:
                    this.firstSpacer = document.createElement("tr");
                    const bottomFirstSpacerCell = document.createElement("td");
                    bottomFirstSpacerCell.style.height = "100%";
                    (this.firstSpacer as Element).appendChild(bottomFirstSpacerCell);
                    this.table.appendChild(this.firstSpacer as Element);

                    break;
            }
        }

        get spacing(): number {
            return this._spacing;
        }

        set spacing(value: number) {
            const difference = value - this._spacing;
            this._spacing = value;

            for (let i = 0; i < this.table.children.length; i++) {
                const row = this.table.children[i];
                const div = row.children[0] as HTMLElement;
                const existingMargin = div.style.marginTop as string;
                const existingSpacing = existingMargin == "" ? 0 : parseInt(existingMargin.substring(0, existingMargin.length - 2));
                const newSpacing = existingSpacing + difference;
                div.style.marginTop = newSpacing + "px";
            }
        }

        createNode(): HTMLElement {
            this.table = document.createElement("table");
            this.table.style.width = "100%";

            const div = document.createElement("div");
            div.appendChild(this.table);

            return div;
        }

        add(child: Control, alignment?: HorizontalAlignment, spaceAbove?: number, animate: boolean = false) {
            this.table.appendChild(this.internalAdd(child, alignment || this.defaultAlignment, spaceAbove || 0, animate));
        }

        internalAdd(child: Control, alignment: HorizontalAlignment, spaceAbove: number, animate: boolean): HTMLElement {
            if (this.count > 0)
                spaceAbove += this.spacing;

            super.addChild(child);

            const row = document.createElement("tr");
            const cell = document.createElement("td");
            const div = document.createElement("div");
            cell.appendChild(div);

            switch (alignment) {
                case HorizontalAlignment.Fill:
                    child.node.style.width = "100%";
                    div.style.width = "100%";
                    break;
                case HorizontalAlignment.Left:
                    cell.setAttribute("align", "left");
                    break;
                case HorizontalAlignment.Center:
                    cell.setAttribute("align", "center");
                    break;
                case HorizontalAlignment.Right:
                    cell.setAttribute("align", "right");
                    break;
            }

            if (spaceAbove != 0) {
                div.style.marginTop = spaceAbove + "px";
            }

            div.appendChild(child.node);
            row.appendChild(cell);

            if (animate) {
                const height = Utils.Elements.measureOffsetHeight(row);
                row.style.display = "none";
                div.style.overflow = "hidden";
                Utils.Animator.animate(
                    (progress: number) => {
                        const newHeight = Math.floor(height * progress);
                        div.style.height = newHeight + "px";
                        row.style.display = "";
                    },
                    VerticalPanel.animationSpeed,
                    () => {
                        div.style.overflow = "";
                        div.style.height = "";
                    });
            }
            return row;
        }

        insertBefore(child: Control, insertBefore: Control, alignment?: HorizontalAlignment, spaceAbove = 0, animate = false) {
            if (insertBefore.parent != this)
                throw new Error("Cannot use a reference node that is not contained by this control");

            alignment = alignment || this.defaultAlignment;
            const div = insertBefore.node.parentElement as HTMLElement;
            const cell = div.parentElement as HTMLElement;
            const row = cell.parentElement as HTMLElement;

            const childNode = this.internalAdd(child, alignment as HorizontalAlignment, spaceAbove, animate);
            this.node.insertBefore(childNode, row);
        }

        insertAfter(child: Control, insertAfter: Control, alignment?: HorizontalAlignment, spaceAbove = 0, animate = false) {
            if (insertAfter.parent != this)
                throw new Error("Cannot use a reference node that is not contained by this control");

            alignment = alignment || this.defaultAlignment;
            const div = insertAfter.node.parentElement as HTMLElement;
            const cell = div.parentElement as HTMLElement;
            const row = cell.parentElement as HTMLElement;

            const childNode = this.internalAdd(child, alignment as HorizontalAlignment, spaceAbove, animate);
            Utils.Elements.insertAfter(this.node, childNode, row);
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
            const cell = div.parentElement as HTMLElement;
            const row = cell.parentElement as HTMLElement;

            if (animate) {
                const height = Utils.Elements.measureOffsetHeight(row);
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
                        this.table.removeChild(row);
                        super.removeChild(child);
                    });
            } else {
                div.removeChild(child.node);
                this.table.removeChild(row);
                super.removeChild(child);
            }
        }

        removeChild(child: Control) {
            this.remove(child);
        }
    }
}